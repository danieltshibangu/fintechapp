require('dotenv').config();

const express = require('express');
const app = express();

const plaid = require('plaid');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

//this lets us easily concatenate paths 
const path = require('path');
// lets us inspect json objects
const util = require('util');
const { assert } = require('console');

console.log(process.env.PLAID_CLIENT_ID)
console.log(process.env.PLAID_SECRET)
console.log(plaid.environments.development)


// create plaid client object 
// valid clientID and secret needed to access client
const plaidClient = new plaid.Client({
    clientID: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    env: plaid.environments.development,
    // if we want to override defaults options ffor requests
    //version: '2020-09-14',
});

// this links to plaid server to create a link token 
// plaid server sends back a temporary pubic token as a response
app.post('/link/token/create', async (request, response) => {
    try {
        const tokenResponse = await plaidClient.createLinkToken({
           user: {
               client_user_id: 'unique-id', 
           },
           client_name: 'string',
           products: ['auth', 'transactions'], 
           country_codes: ['US'],
           language: 'en',
        });

        response.json( tokenResponse );
    } catch (error) {
        // Display error on the client
        return response.send({error: error.message});
    }
});

// this gets the link token from Link 
app.get('/item/get_link_token', async (request, response) => {
    try {
        const tokenRequest = await plaidClient.getLinkToken(tokenResponse);
    } catch (error) {
        return response.send({error: error.message});
    };

    const item = response.item;
    const status = response.status;
});

// deleting a client from the database 
app.post( '/item/remove_client', async (request, response) => {
    try {
        const response = await plaidClient.removeItem(accessToken);
    } catch (error) {
        return response.send({error: error.message});
    };

    // item was removed, invalidate access token 
    assert(response.removeHeader, true);
});

// updating webhooks associated with an item 
app.post( '/item/webhook/update', async (request, response) => {
    try {
        const response = await plaidClient.updateItemWebhook(accessToken, 'https://updatedwebhook.com');
    } catch (error) {
        return response.send({error: error.message});
    };

    // successful repsonse means it updated
    const item = result.item;
});


app.post('/item/public_token/exchange', async (request, response) => {
    try {
        const publicToken = request.body;
        const response = await plaidClient.exchangePublicToken(publicToken);
        const accessToken = response.access_token;
        const itemId = response.item_id;

        response.sendStatus(200);
    } catch (error) {
        return response.send({error: error.message})
    }
});

//---------------------------------------------------------------------------------------

// auth: gets bank info to set up fund transfers
// returns bank acct routing, id, etc
app.get('/auth/get', async (request, response) => {
    try { 
        const response = await plaidClient.getAuth(accessToken, {});
    } catch( error) {
        return response.send({error: error.message})
    };

    const accountData = response.accounts;
    const numbers = response.numbers;
});

// identity: lets one retrieve various account holder information  on file 
app.get('/identity/get', async (request, response) => {
    try {
        const response = await plaidClient.getIdentity(access_token);
    } catch (error) {
        return response.send({error:error.message})
    };

    const identities = response.accounts.flatMap((account) => account.owners);
});

// balance: returns realtime balance for each item's accounts 
app.get('/accounts/balance/get', async (request, response) => {
    try {
        const response = await plaidClient.getBalance(access_token);
    } catch (error) {
        return response.send({error:error.message});
    };

    const accounts = response.accounts;
});

//--------------------------------------------------------------------------------------------

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'plaidSignon.html'));
});

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});