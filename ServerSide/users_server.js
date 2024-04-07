import UsersDB from "../DataBase/users_DB";

class UsersServer{
    constructor(){
        this.db= new UsersDB();
    }
}