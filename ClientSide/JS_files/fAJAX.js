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
        setTimeout(()=>{            //   PR FAIRE UN TMP DE DIFERENCE SI IL EST TROP LENT SA CONTINUE DE LIRE MON CODE 
            console.log("type of callback "+typeof(mycallback))
            console.log("2 fajax send");
            this.response= this.network.sendRequest(this.request,this.data);
            console.log("10 fajax return"+ " "+this.response);
            if (callback==DisplayList){
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


/*class AJAXRequest {
    constructor(method, url, data, callback) {
        this.method = method;
        this.url = url;
        this.data = data;
        this.callback = callback;
    }

    send() {
        const xhr = new XMLHttpRequest();
        xhr.open(this.method, this.url, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                // התקבלה תגובה תקינה מהשרת
                const response = JSON.parse(xhr.responseText);
                this.callback(null, response);
            } else {
                // התקבלה תגובת שגיאה מהשרת
                this.callback("Error: ${xhr.status}", null);
            }
        };

        xhr.onerror = () => {
            // שגיאת תקשורת
            this.callback('Network Error', null);
        };

        if (this.method === 'POST' || this.method === 'PUT') {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(this.data));
        } else {
            xhr.send();
        }
    }
}*/

/**
class Fajax{

    constructor(){
        this.request=null;
        this.phoneNumber=null;
        this.data=null;
        this.network=new Network();
        this.response=null;
    }

    create_request(request,phoneNumber=null,data=null){
        this.request=request;
        this.phoneNumber=phoneNumber;
        this.data=data;

        console.log("1 fajax create");
    }

    send(callback=null){
        setTimeout(()=>{            //   PR FAIRE UN TMP DE DIFERENCE SI IL EST TROP LENT SA CONTINUE DE LIRE MON CODE 
            console.log("type of callback "+typeof(mycallback))
            console.log("2 fajax send");
            this.response= this.network.sendRequest(this.request,this.phoneNumber,this.data);
            console.log("10 fajax return"+ " "+this.response);
            // callbak
            if (callback==DisplayList){
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
 */


// דוגמה לשימוש במחלקה AJAXRequest:
/*const request = new AJAXRequest('GET', 'https://api.example.com/data', null, (err, response) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Response:', response);
    }
});

request.send();*/