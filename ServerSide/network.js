import UsersServer from "../ServerSide/users_server"
import ContactsServer from "./contacts_server"
class Network{
    constructor(){
        this.userServer = new UsersServer();
        this.contactsServer = new ContactsServer();
    }
}

module.exports= Network;