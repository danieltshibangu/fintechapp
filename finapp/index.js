// include the parse library
//const Parse = require('parse/node');

Parse.initialize(
    '32iWvJteYJFXS3p8ALFS1fymMSX45GTYwgeV2l9T', // This is your Application ID
    '3FZP05YRjcu5rEM0Vj5TYHCfONW5pCLT3G8dgUl8', // This is your Javascript key
    'BBQuBxlbrKzZhaHU7bGKi9HVYMBzuNxJe8ZN6aVV' // This is your Master key (never use it in the frontend)
    );

// location of server that will communicate with client    
Parse.serverURL = 'https://parseapi.back4app.com/';


//make a generic user
const user = new Parse.User();
// set button for submitting data
user.set('active', false);
user.set('role', 'user');
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let userEmail = document.getElementById("userEmail");
let phoneNumber = document.getElementById("input-mobile");
let username = document.getElementById("userName");
let password = document.getElementById("password");

// set the values once the form has been submitted 
function setUser() {
    try {
       if (typeof document !== 'undefined') document.write('Values set successfully');
        user.set('firstName', firstName.value);
        user.set('lastName', lastName.value);
        user.set('mobilePhoneNumber', phoneNumber.value);
        user.set('email', userEmail.value);
        user.set('username', username.value);
        user.set('password', password.value);
        createAccount();
}   catch (error) {
        if (typeof document !== 'undefined') document.write(`but, Error setting values: ${error.message}`);
        console.log('Error setting values', error);
}};


// a function for signing up the user
async function createAccount() {
    user.signUp()
    .then(response => {
        if (typeof document !== 'undefined') return document.write('Signed up successfully!');
        console.log('Signed up user', response);
    }).catch( error => {
        if (typeof document !== 'undefined') return document.write(`Error while signing up: ${JSON.stringify(error)}`);
        console.log('Error while signing up', error)
    });
};

// function to test is string has number in it 
async function hasNumber(someString) {
    return /\d/.test(someString);
}

// add an event listener for each field
// eventListeners check form fields each time the person types something in 
firstName.addEventListener('input', function () {
    // check if it has a value 
    let onlyLetters = /^[A-Za-z]+$/;
    try {
        if (firstName.value !== 'null' && firstName.value !== 'undefined') {
           if (firstName.value.match(onlyLetters)) return true; 
        }
    } catch(error) {
        console.log("First Name input is wrong", error);
};
});

// event listener for lastname 
lastName.addEventListener('input', function () {
   // check if it has a value 
   let onlyLetters = /^[A-Za-z]+$/;
   try {
       if (lastName.value !== 'null' && lastName.value !== 'undefined') {
          if (lastName.value.match(onlyLetters)) return true; 
       }
   } catch(error) {
       console.log("Last Name entry error: ", error);
};
});

// event listener for userEmail
userEmail.addEventListener('input', function () {
    let emailAplha = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    try {
        if (userEmail.value !== 'null' && userEmail.value !== 'undefined') {
            if (userEmail.value.match(emailAplha)) return true;
        }
    } catch (error) {
        console.log("Email entry error: ", error);
    };
});

// event listener for phone number
phoneNumber.addEventListener('input', function () {
    let onlyNum = /^[0-9]+$/;
    try {
        if (phoneNumber.value !== 'null' && phoneNumber.value !== 'undefined') {
            if (phoneNumber.value.match(onlyNum)) return true;
        }  
    } catch (error) {
        console.log("Phone Entry Error: ", error);
    };
});

// event listener for username
username.addEventListener('input', function () {
    try {
        if (username.value !== 'null' && username.value !== 'undefined') {
            return true;
        }
    } catch (error) {
        console.log("Email entry error: ", error);
    };
});

// event listener for password
password.addEventListener('input', function () {
    try {
        if (password.value !== 'null' && password.value !== 'undefined') {
             return true;
        }
    } catch (error) {
        console.log("Password entry error: ", error);
    };
});

