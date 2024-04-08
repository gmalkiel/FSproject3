import ContactsDB from "../DataBase/contacts_DB";

class ContactsServer{
    constructor(){
        this.db= new ContactsDB();
    }

    receiveRequest(request,phoneNumber=null,data=null){
        if(request=== "GETALL"){
            return this.getAll();
        }
        else if(request=== "GET"){
            return this.get(phoneNumber);
        }
        else if(request=== "POST"){
            return this.post(phoneNumber,data);
        }
        else if(request=== "PUT"){
            return this.put(phoneNumber,data);
        }
        else if(request=== "DELETE"){
            return this.del(phoneNumber);
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
        this.db.post(username, contact);
    }
    put(username, contact) {
        this.db.put(username, contact);
    }
    del(username,contactname) {
        this.db.delete(username,contactname);
    }     
}

module.exports=  ContactsServer;