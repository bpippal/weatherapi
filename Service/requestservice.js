const Baseservice = require("./Baseservice");
const request = require("request");
const util = require("util");
const promisifiedRequest = util.promisify(request);

function RequestService(){
    this.serviceName = "requestservice";
    Baseservice.call(this);
}

RequestService.prototype._request = function(reqObj){

    return promisifiedRequest(reqObj);
}

module.exports = {
    getInst : function(){
        return new RequestService();
    }
}