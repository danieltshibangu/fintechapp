Parse.initialize(
    '32iWvJteYJFXS3p8ALFS1fymMSX45GTYwgeV2l9T', // This is your Application ID
    '3FZP05YRjcu5rEM0Vj5TYHCfONW5pCLT3G8dgUl8', // This is your Javascript key
    'BBQuBxlbrKzZhaHU7bGKi9HVYMBzuNxJe8ZN6aVV' // This is your Master key (never use it in the frontend)
    );

// location of server that will communicate with client    
Parse.serverURL = 'https://parseapi.back4app.com/';


// get the contents of each input 
let username = document.getElementById("userName");
let password = document.getElementById("password");

// fucntion for logging in after getting input 
function loggingIn() { 
    Parse.User.logIn(username.value, password.value).then( 
        (res) => {
            if (typeof document !== 'undefined') document.write("Login successful");
            console.log('Login successful', res);
        }).catch(error => {
            if (typeof document !== 'undefined') document.write(`Error while logging in: ${error.message}`);
            console.log('Error while logging in ', error);
        });
    };