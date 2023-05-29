const appConfig = require("./config/app");
const initRoutes = require("./routes");

function initApplication(expressApp){


    if(appConfig && appConfig.cluster && appConfig.cluster.enable){
        const cluster = require("cluster");    
        const totalCpus = require("os").cpus();
    
        if(cluster.isMaster){
            for(let i=0 ; i<totalCpus.length ; i++){
                cluster.fork();
            }
        }else{
            //Here application is supposed to be created
            initRoutes(expressApp);
        }
    
    }else{
        initRoutes(expressApp);
    }

}


module.exports = initApplication;