const Parse = require('parse/node');

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'BCrUQVkk80pCdeImSXoKXL5ZCtyyEZwbN7mAb11f', // This is your Application ID
  '4wPYRKbpTJeCdmFNaS31AiQZ8344aaYubk6Uo8VW', // This is your Javascript key
  '5AVAtvlGlG5cEeolatkFDhY5p99PzoBUvm7MBLMo' // This is your Master key (never use it in the frontend)
);

// Signing up 
// making a generic user  and giving it certain properties and values
const user = new Parse.User();
user.set('username', 'string');
user.set