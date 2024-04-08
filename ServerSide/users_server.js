import UsersDB from "../DataBase/users_DB";

class UsersServer{
    constructor(){
        this.db= new UsersDB();
    }

    processRequest(request,username,data=null){
        if(request=== "GETUSERS"){
            return this.getAll();
        }
        else if(request=== "GETUSER"){
            return this.get(username);
        }
        else if(request=== "POSTUSER"){
            return this.post(data);
        }
        else{
            alert("wrong request : "+ request)
            return false;
        }  
    }

    get(username) {
        return this.db.getUser(username);
    }
    getAll() {
        return this.db.getUsers();
    }
    post(user){
        this.db.addUser(user);
    }    
}

module.exports= UsersServer;