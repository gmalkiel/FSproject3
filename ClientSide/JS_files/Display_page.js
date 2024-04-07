const app = {
    pages: [],
    show: new Event('show'),
    init: function(){
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);
        })
        
        document.querySelectorAll('.nav-link').forEach((link)=>{
            link.addEventListener('click', app.nav);
        })
        history.replaceState({}, 'Signup', '#signup');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function(ev){
        ev.preventDefault();
        //let currentPage = window.location.href;
        let currentPage = ev.target.getAttribute('data-target');
        let myPage = window.location.hash.slice(1);

        //let currentPage = ev.target.getAttribute('data-target');
        if (myPage === "signin") {
            if(signinFunction()){
                window.location.href='#data';
            }
            else{
                return;
            }
        }
        else if (myPage === "signup") {
            if(signupFunction()){
                window.location.href='#data';
            }
            else{
                return;
            }
        }
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage);
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: function(ev){
        
        console.log('Page', ev.target.id, 'just shown');
        let h1 = ev.target.querySelector('h1');
        h1.classList.add('big')
        setTimeout((h)=>{
            h.classList.remove('big');
        }, 1200, h1);
    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash)
        document.getElementById(hash).dispatchEvent(app.show);
    }
    
}

document.addEventListener('DOMContentLoaded', app.init);

function signupFunction() {
    const username = document.getElementById('username').value;
    const dob = new Date(document.getElementById('dob').value);
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userNameMessage = document.getElementById('userNameError');
    const passwordMessage = document.getElementById('passwordError');
    const dobMessage = document.getElementById('dobError');
    const emailMessage = document.getElementById('emailError');
    const phoneMessage = document.getElementById('phoneError');
    const confirmPasswordMessage = document.getElementById('confirmPasswordError');

    passwordMessage.innerHTML = '';
    userNameMessage.innerHTML = '';
    dobMessage.innerHTML = '';
    emailMessage.innerHTML = '';
    phoneMessage.innerHTML = '';
    confirmPasswordMessage.innerHTML = '';

    // Get stored data from local storage
    const storedDataArray = Object.values(localStorage);
    const storeData = localStorage.getItem(password);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    var flag = true;

    // Loop through each stored data
    for (const storedData of storedDataArray) {
        try {
            const userData = JSON.parse(storedData);

            // Check if the entered email matches any stored email
            if (userData.UserEmail === email) {
                emailMessage.innerHTML = 'There is already a user account on this email address.'; // Email already exists
                flag = false;
            }
            // Check if the entered user name matches any stored user name
            if (userData.UserNamen === username) {
                userNameMessage.innerHTML = 'This username already exists, please choose another one.'; // user name already exists
                flag = false;
            }
        } catch (error) {
            // Handle parsing error if any
            console.error('Error parsing stored data:', error);
        }
    }

    // Check if passwords match
    if (storeData) {
        passwordMessage.innerHTML = 'This password already exists, please choose another one.';
        flag = false;
    }

    // Check if the user is at least 16 years old
    if (age < 16) {
        dobMessage.innerHTML = 'You must be at least 16 years old to Signup.';
        flag = false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        confirmPasswordMessage.innerHTML = 'Passwords do not match.';
        flag = false;
    }

    // Check if email and phone are in valid formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    if (!emailRegex.test(email)) {
        emailMessage.innerHTML = 'Please enter valid email formats.';
        flag = false;
    }
    if (!phoneRegex.test(phone)) {
        phoneMessage.innerHTML = 'Please enter valid phone formats.';
        flag = false;
    }

    // Check if any field is empty
    if (!username || !dob || !email || !phone || !password || !confirmPassword) {
        document.getElementById('result').innerHTML = 'Please fill in all fields.';
        flag = false;
    }

    // Display a success message
    if (flag) {
        document.getElementById('result').innerHTML = 'Signup successful!';
        // Call the function to save data to local storage
        saveToLocalStorage(username, dob, email, phone, password);
        // Hide the first button
    }
    return flag;
}
function saveToLocalStorage(username, dob, email, phone, password) {
    var un = username;
    var udob = dob;
    var uem = email;
    var uph = phone;
    var upas = password;
    var UserData = {
        UserNamen: un,
        DateOfBirth: udob,
        UserEmail: uem,
        UserPhone: uph,
        LastSignIn: new Date().toISOString(),
        FirstGHighestScore: 0,
        SecondGHighestScore: 0,
    };
}

let wrongPasswordAttempts = 0;
let blockedTimeRemaining = 0;
const blockDurationMultiplier = 10;

function signinFunction() {
    const usernameInput = document.getElementById('usern');
    const passwordInput = document.getElementById('passw');
    const resultDiv = document.getElementById('result');
    const userNameMessage = document.getElementById('userNameError');
    const passwordMessage = document.getElementById('passwordError');
    const timerElement = document.getElementById('timer');
    
    //The user is blocked from entering further details for 30 seconds
    if (passwordInput.disabled) {
        passwordError.innerText = 'Blocked for 30 seconds. Try again later.';
        return;
    }

    passwordMessage.innerHTML = '';
    userNameMessage.innerHTML = '';

    // Get stored data from local storage
    const storedPassword = localStorage.getItem(passwordInput.value);

    // Data validation 
    if (storedPassword) {
        const userd = JSON.parse(storedPassword);

        // Check if the entered username and password match
        if (userd.UserNamen === usernameInput.value) {
            userd.LastSignIn = new Date().toISOString();
            var updatedData = JSON.stringify(userd);
            localStorage.setItem(passwordInput.value, updatedData);
            resultDiv.innerHTML = 'Signin successful!';
        }
        else {
            userNameMessage.innerHTML = 'The username and password do not match.';
        }
    }
    else {
        wrongPasswordAttempts++;

        if (wrongPasswordAttempts >= 1) {
            usernameInput.disabled = true;
            passwordInput.disabled = true;
            const blockDuration = blockDurationMultiplier * wrongPasswordAttempts;
            blockedTimeRemaining = blockDuration;

            const timerInterval = setInterval(() => {
                if (blockedTimeRemaining > 0) {
                    passwordError.innerText = `blocked for ${blockedTimeRemaining} seconds.`;
                    blockedTimeRemaining--;
                } else {
                    clearInterval(timerInterval);
                    blockedTimeRemaining = 0;
                    wrongPasswordAttempts = 0;
                    passwordError.innerText = '';
                    usernameInput.disabled = false;
                    passwordInput.disabled = false;
                }
            }, 1000);
        } else {
            passwordMessage.innerHTML = 'Incorrect password.';
        }
    }
}


