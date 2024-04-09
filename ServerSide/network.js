import UsersServer from "../ServerSide/users_server.js"
import ContactsServer from "../ServerSide/contacts_server.js"
class Network{
    constructor(){
        this.userServer = new UsersServer();
        this.contactsServer = new ContactsServer();
    }

    sendRequest(request,data=null){
        let server;
        switch(request){
            case 'GETUSERS':
            case 'GETUSER':
            case 'POSTUSER': server= this.userServer;
            break;
            case 'GETCONTACTS':
            case 'GETCONTACT':
            case 'POST':
            case 'PUT':
            case 'DELETE': server= this.contactsServer;
            break;
            default: return null;
        }
        let result = server.processRequest(request, data);
        console.log("network result"+"  "+result);
        if (result != null) {
            return result;
      }
    }


}

export default Network;