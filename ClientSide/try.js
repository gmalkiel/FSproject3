// רשימה של אנשי קשר
const contacts = [
    { name: "John Doe", phone: "123456789", email: "john@example.com" },
    { name: "Jane Smith", phone: "987654321", email: "jane@example.com" },
    // ניתן להוסיף אנשי קשר נוספים ככל שתרצה
];

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
            const phoneNumber = contact.phone;
            deleteContact(phoneNumber);
        });

        // הוספת אירוע לחיצה למעבר לעמוד תצוגת איש הקשר
        const contactName = li.querySelector('.contactName');
        contactName.addEventListener('click', () => {
            showContactDetails(contact);
        });
    });
}


// פונקציה למחיקת איש קשר מהרשימה
function deleteContact(phoneNumber) {
    const index = contacts.findIndex(contact => contact.phone === phoneNumber);
    if (index !== -1) {
        contacts.splice(index, 1);
        printContacts(contacts); // רענון הרשימה לאחר המחיקה
    }
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
        });
    });
}


// פונקציה להצגת חלון מוקטן עם פרטי איש קשר ואפשרות לעריכתם
/*function showContactDetails(contact) {
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
    });
}*/


// פונקציה לחיפוש איש קשר מסוים ברשימת אנשי הקשר
function searchContacts(query) {
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(query.toLowerCase())
    );
    printContacts(filteredContacts);
}

// קריאה ראשונית לפונקציה להדפסת רשימת אנשי הקשר לעמוד HTML
printContacts(contacts);

// קביעת אירוע לחיפוש איש קשר מסוים על ידי המשתמש
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    searchContacts(searchInput.value);
});

// פונקציה לעריכת איש קשר
function editContact(contact) {
    const newName = prompt('Enter new name:', contact.name);
    const newPhone = prompt('Enter new phone number:', contact.phone);
    const newEmail = prompt('Enter new email:', contact.email);

    if (newName && newPhone && newEmail) {
        contact.name = newName;
        contact.phone = newPhone;
        contact.email = newEmail;
        // רענון תצוגת פרטי האיש קשר לאחר שינויים
        document.getElementById('contactName').innerText = newName;
        document.getElementById('contactPhone').innerText = newPhone;
        document.getElementById('contactEmail').innerText = newEmail;
    }
}

// פונקציה להוספת איש קשר חדש
function addContact() {
    const newName = prompt('Enter name:');
    const newPhone = prompt('Enter phone number:');
    const newEmail = prompt('Enter email:');

    if (newName && newPhone && newEmail) {
        const newContact = { name: newName, phone: newPhone, email: newEmail };
        contacts.push(newContact);
        printContacts(contacts);
    }
}

// הוספת אירוע לחיצה להוספת איש קשר חדש
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addContact);

