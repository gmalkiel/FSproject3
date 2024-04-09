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
            if (callback==printContacts){
                try
                {
                    JSON.parse(this.response);
                    callback(JSON.parse(this.response));
                }
                catch(error){
                    callback(this.response);
                }
            }else if (callback==RemoveTemplate){
                callback()
            }
        },1000)
    }
    
    getResponse(){
        
        return this.response;
    }
}

export default FAJAX; 
