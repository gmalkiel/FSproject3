import FAJAX from "./fAJAX.js";
let user = null;
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
            // Get stored data from local storage
            const usernameInput = document.getElementById('usern');
            var dataJason = {UserName:usernameInput.value}
            var fajax=new FAJAX();
            fajax.create_request("GETUSER",JSON.stringify(dataJason));
            fajax.send(signinFunction);
            if(user){
                window.location.href='#data';
                var fajax=new FAJAX();
                var userNJason = {UserName:user};
                fajax.create_request("GETCONTACTS", JSON.stringify(userNJason));
                fajax.send(printContacts);
            }
            else{
                return;
            }
        }
        else if (myPage === "signup" && currentPage ==="data") {
            // Get stored data from local storage
            var fajax=new FAJAX();
            fajax.create_request("GETUSERS");
            fajax.send(signupFunction);
            if(user){
                window.location.href='#data';
                var fajax=new FAJAX();
                var userNJason = {UserName:user};
                fajax.create_request("GETCONTACTS", JSON.stringify(userNJason));
                fajax.send(printContacts);
            }
            else{
                return;
            }
        }
        else if(myPage == "addcontact"){
            const cname = document.getElementById('name').value;
            const cemail = document.getElementById('email').value;
            const cphone = document.getElementById('phone').value;
            var fajax=new FAJAX();
            var contact = {name:cname,phone:cphone,email:cemail};
            var dataJason = {UserName:user,contact:contact};
            fajax.create_request("POST", JSON.stringify(dataJason));
            fajax.send(printContacts);
            //addContact();
            window.location.href='#data';
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

function signupFunction(storedDataArray) {
    
    const username = document.getElementById('username').value;
    const dob = new Date(document.getElementById('dob').value);
    const email = document.getElementById('useremail').value;
    const phone = document.getElementById('userphone').value;
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
    //const storedData = Object.values(localStorage);

    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    var flag = true;
    //const storedDataArray = fajax.getResponse();

    if (storedDataArray){
        // Loop through each stored data
        for (const userData of storedDataArray) {
            try {
                //const userData = JSON.parse(storedData);

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
                // Check if passwords match
                if (userData.UserPassword === password) {
                    passwordMessage.innerHTML = 'This password already exists, please choose another one.';
                    flag = false;
                }
            } catch (error) {
                // Handle parsing error if any
                console.error('Error parsing stored data:', error);
            }
        }
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
        user = username;
    }
    return flag;
}
function saveToLocalStorage(username, dob, email, phone, password) {
    var UserData = {
        UserPassword: password,
        UserName: username,
        DateOfBirth: dob,
        UserEmail: email,
        UserPhone: phone
    };
    var fajax=new FAJAX();
    fajax.create_request("POSTUSER",JSON.stringify(UserData));
    fajax.send();
}

let wrongPasswordAttempts = 0;
let blockedTimeRemaining = 0;
const blockDurationMultiplier = 10;

function signinFunction(userelement) {
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
    // Data validation 
    if (userelement) {

        // Check if the entered username and password match
        if (userelement.UserPassword === passwordInput.value) {
            user = usernameInput.value;
            resultDiv.innerHTML = 'Signin successful!';
            //return true;
        }
        else {
            userNameMessage.innerHTML = 'The username and password do not match.';
        }
    }
    else {
        if(usernameInput.value != "" && passwordInput.value != ""){
            wrongPasswordAttempts++;
        }
        if (wrongPasswordAttempts >= 3) {
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

// פונקציה להדפסת רשימת אנשי הקשר לעמוד HTML
function printContacts(contactList) {
    const contactListElement = document.getElementById('contactList');
    // ניקוון רשימת הקשרים לפני ההדפסה
    contactListElement.innerHTML = '';

    // לכל איש קשר ברשימה, הדפסת שם וכפתור מחיקה
    contactList.forEach(contact => {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        li.innerHTML = `<span class="contactName">${contact.name}</span>`;
        li.appendChild(deleteButton);
        contactListElement.appendChild(li);

        // הוספת אירוע לחיצה למחיקת איש הקשר
        deleteButton.addEventListener('click', () => {
            deleteContact(contact);
        });

        // הוספת אירוע לחיצה למעבר לעמוד תצוגת איש הקשר
        const contactName = li.querySelector('.contactName');
        contactName.addEventListener('click', () => {
            var fajax=new FAJAX();
            var dataJason = {UserName:user,contactName:contactName}
            fajax.create_request("GETCONTACT", JSON.stringify(dataJason));
            fajax.send();
            showContactDetails(fajax.getResponse);
        });
    });
}


// פונקציה למחיקת איש קשר מהרשימה
function deleteContact(contact) {
    var fajax=new FAJAX();
    var dataJason = {UserName:user,contact:contact}
    fajax.create_request("DELETE", JSON.stringify(dataJason));
    fajax.send(printContacts);
}

// פונקציה להצגת חלון מוקטן עם פרטי איש קשר ואפשרות לעריכתם
function showContactDetails(contact) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Name: <span id="contactName">${contact.name}</span></p>
            <p>Phone: <span id="contactPhone">${contact.phone}</span></p>
            <p>Email: <span id="contactEmail">${contact.email}</span></p>
            <button id="editButton">Edit</button>
        </div>
    `;
    document.body.appendChild(modal);

    // הוספת אירוע לחיצה לסגירת החלון המוקטן
    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', () => {
        modal.remove();
    });

    // הוספת אירוע לחיצה לכפתור עריכה
    const editButton = modal.querySelector('#editButton');
    editButton.addEventListener('click', () => {
        editContact(contact);
        var fajax=new FAJAX();
        var dataJason = {UserName:user,contact:contact}
        fajax.create_request("PUT", JSON.stringify(dataJason));
        fajax.send(printContacts);
    });

    // הוספת אירוע ללחיצה על כל שדה כדי לאפשר עריכה ישירה
    const contactFields = modal.querySelectorAll('.modal-content p span');
    contactFields.forEach(field => {
        field.addEventListener('click', () => {
            const newValue = prompt(`Enter new ${field.id}:`, field.innerText);
            if (newValue) {
                field.innerText = newValue;
                // עדכון נתוני האיש קשר ברשימה
                if (field.id === 'contactName') contact.name = newValue;
                if (field.id === 'contactPhone') contact.phone = newValue;
                if (field.id === 'contactEmail') contact.email = newValue;
            }
            var fajax=new FAJAX();
            var dataJason = {UserName:user,contact:contact}
            fajax.create_request("PUT", JSON.stringify(dataJason));
            fajax.send(printContacts);
        });
    });
}

// פונקציה לעריכת איש קשר
function editContact(contact) {
    const newName = prompt('Enter new name:', contact.name);
    const newPhone = prompt('Enter new phone number:', contact.phone);
    const newEmail = prompt('Enter new email:', contact.email);

    if (newName && newPhone && newEmail) {
        contact.name = newName;
        contact.phone = newPhone;
        contact.email = newEmail;
    }
}

/*function addContact() {
    const cname = document.getElementById('name').value;
    const cemail = document.getElementById('email').value;
    const cphone = document.getElementById('phone').value;
    var fajax=new FAJAX();
    var contact = {name:cname,phone:cphone,email:cemail};
    var dataJason = {UserName:user,contact:contact};
    fajax.create_request("PUT", JSON.stringify(dataJason));
    fajax.send(printContacts);
}*/
