import Network from "../../ServerSide/network.js";
class FAJAX{

    constructor(){
        this.request=null;
        this.data=null;
        this.network=new Network();
        this.response=null;
    }

    create_request(request,data=null){
        this.request=request;
        this.data=data;

        console.log("1 fajax create");
    }

    send(callback=null){
        setTimeout(()=>{           
            console.log("type of callback "+typeof(mycallback))
            console.log("2 fajax send");
            this.response= this.network.sendRequest(this.request,this.data);
            console.log("10 fajax return"+ " "+this.response);
            if (callback.name=="signupFunction"){
                try
                {
                    callback(this.response);
                }
                catch(error){
                    callback(this.response);
                }
            }else if (callback.name=="printContacts"){
                callback(this.response);
            }else if (callback.name=="signinFunction"){
                try
                {
                    callback(this.response);
                }
                catch(error){
                    callback(this.response);
                }
            }
        },1000)
    }
    
    getResponse(){
        
        return this.response;
    }
}

export default FAJAX; 
