import ContactsDB from "../DataBase/contacts_DB";

class ContactsServer{
    constructor(){
        this.db= new ContactsDB();
    }

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

    get(data) {
        return this.db.get(username,contactname);
    }
    getAll(data) {
        let user= JSON.parse(data);
        return this.db.getAll(user.username);
    }
    post(data){
        return this.db.post(username, contact);
    }
    put(data) {
        return this.db.put(username, contact);
    }
    del(data) {
        return this.db.delete(username,contactname);
    }     
}

module.exports=  ContactsServer;