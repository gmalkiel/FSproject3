import ContactsDB from "../DataBase/contacts_DB";

class ContactsServer{
    constructor(){
        this.db= new ContactsDB();
    }

    processRequest(request,username,data=null){
        if(request=== "GETCONTACTS"){
            return this.getAll(username);
        }
        else if(request=== "GETCONTACT"){
            return this.get(username,data);
        }
        else if(request=== "POST"){
            return this.post(username,data);
        }
        else if(request=== "PUT"){
            return this.put(username,data);
        }
        else if(request=== "DELETE"){
            return this.del(username,data);
        }
        else{
            alert("wrong request : "+ request)
            return false;
        }  
    }

    get(username,contactname) {
        return this.db.get(username,contactname);
    }
    getAll(username) {
        return this.db.getAll(username);
    }
    post(username, contact){
        return this.db.post(username, contact);
    }
    put(username, contact) {
        return this.db.put(username, contact);
    }
    del(username,contactname) {
        return this.db.delete(username,contactname);
    }     
}

module.exports=  ContactsServer;