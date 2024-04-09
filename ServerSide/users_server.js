import UsersDB from "../DataBase/users_DB.js";
//User management server
class UsersServer{
    constructor(){
        this.db= new UsersDB();
    }

    //recieve request
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

    //get user
    get(data) {
        let user = JSON.parse(data);
        return this.db.getUser(user.UserName);
    }

    //get all users
    getAll() {
        return this.db.getUsers();
    }

    //post new user
    post(data){
        let user= JSON.parse(data);
        this.db.addUser(user);
    }    
}

export default UsersServer;