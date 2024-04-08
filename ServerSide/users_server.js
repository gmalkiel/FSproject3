import UsersDB from "../DataBase/users_DB";

class UsersServer{
    constructor(){
        this.db= new UsersDB();
    }

    processRequest(request, data=null){
        if(request=== "GETUSERS"){
            return this.getAll();
        }
        else if(request=== "GETUSER"){
            return this.get(data);
        }
        else if(request=== "POSTUSER"){
            return this.post(data);
        }
        else{
            alert("wrong request : "+ request)
            return false;
        }  
    }

    get(data) {
        let user = JSON.parse(data);
        return this.db.getUser(user.username);
    }
    getAll() {
        return this.db.getUsers();
    }
    post(data){
        let user= JSON.parse(data);
        this.db.addUser(user);
    }    
}

module.exports= UsersServer;