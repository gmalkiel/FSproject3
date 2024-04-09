import ContactsDB from "../DataBase/contacts_DB.js";
//Contacts management server
class ContactsServer{
    constructor(){
        this.db= new ContactsDB();
    }

    //recieve request
    processRequest(request, data=null){
        if(request=== "GETCONTACTS"){
            return this.getAll(data);
        }
        else if(request=== "GETCONTACT"){
            return this.get(data);
        }
        else if(request=== "POST"){
            return this.post(data);
        }
        else if(request=== "PUT"){
            return this.put(data);
        }
        else if(request=== "DELETE"){
            return this.del(data);
        }
        else{
            alert("wrong request : "+ request)
            return false;
        }  
    }

    //get contact
    get(data) {
        let dataobj= JSON.parse(data);
        return this.db.get(dataobj.UserName,dataobj.contactName);
    }

    //get all contacts
    getAll(data) {
        let user= JSON.parse(data);
        return this.db.getAll(user.UserName);
    }

    //post new contact
    post(data){
        let dataobj= JSON.parse(data);
        return this.db.post(dataobj.UserName, dataobj.contact);
    }

    //update contact
    put(data) {
        let dataobj= JSON.parse(data);
        return this.db.put(dataobj.UserName, dataobj.contact);
    }

    //drelete contact
    del(data) {
        let dataobj= JSON.parse(data);
        return this.db.delete(dataobj.UserName,dataobj.contact);
    }     
}

export default ContactsServer;