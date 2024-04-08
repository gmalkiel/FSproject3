const UsersDB = require("./users_DB");

class ContactsDB{

    constructor(){
        this.CONTACT_KEY = "contacts";
    }

    get(username,name) {
        const contacts= getUserContacts(username);
        return contacts.find(contact => contact.name === name);
    }
    getAll(username) {
        return getUserContacts(username);
    }
    put(username,contact) {
        let contacts= getUserContacts(username);
        const contact_index= contacts.findIndex(cont=> cont.name=== contact.name
             || cont.phone=== contact.phone);
        contacts[contact_index]= contact;
        const userContacts= new UserContacts(user,contacts);
        saveUserContactsToLocalStorage(userContacts);
        return contacts;
    }
    post(username,contact) {
        let contacts= getUserContacts(username);
        if(contacts){
            cotacts.push(contact);
        }
        else{
            contacts=[contact];
        }
        const userContacts= new UserContacts(user,contacts);
        saveUserContactsToLocalStorage(userContacts);
        return contacts;

    }
    delete(username,contact) {
        let contacts= getUserContacts(username);
        contacts.filter(cont=> contact.phone !== cont.phone)
        const userContacts= new UserContacts(user,contacts);
        saveUserContactsToLocalStorage(userContacts);
        return contacts;
    }    

}

function getContactsFromLocalStorage() {
    const contactsJSON = localStorage.getItem(CONTACT_KEY);
    return contactsJSON ? JSON.parse(contactsJSON) : [];
  }
  
  function saveContactsToLocalStorage(contacts) {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(contacts));
  }
  
  function getUserContacts(username){
    const all_contacts= getContactsFromLocalStorage();
    const user= all_contacts.find(user => user.username === username);
    return user ? user.contacts : [];
  }

  function saveUserContactsToLocalStorage(usercontacts){
    let all_contacts= getContactsFromLocalStorage();
    const user_index= all_contacts.findIndex(user => user.username === usercontacts.username);
    if(user_index===-1){
        all_contacts.push(usercontacts);
    }
    else{
        all_contacts[user_index]= usercontacts;
    }
    saveContactsToLocalStorage(all_contacts);
  }

  
  class UserContacts{
    constructor(username, contacts=[]){
        this.username= username;
        this.contacts= contacts;
    }
  }

  module.exports = ContactsDB;