//Database for saving contacts for each user
class ContactsDB{

    constructor(){
    }

    //get contact
    get(username,name) {
        const contacts= getUserContacts(username);
        return contacts.find(contact => contact.name === name);
    }

    //get all contacts
    getAll(username) {
        return getUserContacts(username);
    }

    //update contact
    put(username,contact) {
        let contacts= getUserContacts(username);
        const contact_index= contacts.findIndex(cont=> cont.name=== contact.name
             || cont.phone=== contact.phone);
        contacts[contact_index]= contact;
        const userContacts= new UserContacts(username,contacts);
        saveUserContactsToLocalStorage(userContacts);
        return contacts;
    }

    //post new contact
    post(username,contact) {
        let contacts= getUserContacts(username);
        if(contacts){
            contacts.push(contact);
        }
        else{
            contacts=[contact];
        }
        const userContacts= new UserContacts(username,contacts);
        saveUserContactsToLocalStorage(userContacts);
        return contacts;

    }

    //delete contact
    delete(username,contact) {
        let contacts= getUserContacts(username);
        contacts= contacts.filter(cont=> contact.phone !== cont.phone);
        const userContacts= new UserContacts(username,contacts);
        saveUserContactsToLocalStorage(userContacts);
        return contacts;
    }    

}

function getContactsFromLocalStorage() {
    const contactsJSON = localStorage.getItem("CONTACTS");
    return contactsJSON ? JSON.parse(contactsJSON) : [];
  }
  
  function saveContactsToLocalStorage(contacts) {
    localStorage.setItem("CONTACTS", JSON.stringify(contacts));
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

export default ContactsDB;