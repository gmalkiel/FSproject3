const UsersDB = require("./users_DB");

class ContactsDB{

    constructor(){
        this.CONTACT_KEY = "contacts";
    }

    get(username,contactname) {
        const contacts= getUserContacts(username);
        return contacts.find(contact => contact.contactname === contactname);
    }
    getAll(username) {
        return getUserContacts(username);
    }
    put(username,contact) {
        let contacts= getUserContacts(username);
        const contact_index= contacts.findIndex(cont=> cont.contactname=== contact.contactname
             || cont.contactphone=== contact.contactphone);
        contacts[contact_index]= contact;
        const userContacts= new UserContacts(user,contacts);
        saveUserContactsToLocalStorage(userContacts);
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

    }
    delete(username,contactname) {
        let contacts= getUserContacts(username);
        contacts.filter(contact=> contact.contactname !== contactname)
        const userContacts= new UserContacts(user,contacts);
        saveUserContactsToLocalStorage(userContacts);
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
    const all_contacts= getContactsFromLocalStorage();
    const user_index= all_contacts.findIndex(user => user.username === usercontacts.username);
    if(user_index===-1){
        all_contacts.push(usercontacts);
    }
    else{
        all_contacts[user_index]= usercontacts;
    }
    saveContactsToLocalStorage(all_contacts);
  }

  class Contact{
    constructor(contactname, contactphone){
        this.contactname= contactname;
        this.contactphone= contactphone;
    }
  }

  class UserContacts{
    constructor(username, contacts=[]){
        this.username= username;
        this.contacts= contacts;
    }
  }

  module.exports = ContactsDB;