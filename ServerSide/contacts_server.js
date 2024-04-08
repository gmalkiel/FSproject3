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
        let dataobj= JSON.parse(data);
        return this.db.get(dataobj.username,dataobj.phone);
    }
    getAll(data) {
        let user= JSON.parse(data);
        return this.db.getAll(user.username);
    }
    post(data){
        let dataobj= JSON.parse(data);
        return this.db.post(dataobj.username, dataobj.contact);
    }
    put(data) {
        let dataobj= JSON.parse(data);
        return this.db.put(dataobj.username, dataobj.contact);
    }
    del(data) {
        let dataobj= JSON.parse(data);
        return this.db.delete(dataobj.username,dataobj.phone);
    }     
}

module.exports=  ContactsServer;