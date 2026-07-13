import app from "./app";
import { config } from "./config/config";

const main = () =>{
    try{
        const server = app.listen(config.port_number, ()=>{
            console.log("This application is listening form port number : ", config.port_number);
        });

        server.on("error", (error)=>{
            console.log("Server Failed with : ", error);
            process.exit(1);
        })

    }catch(error){
        console.log(error);
        console.log("UnKnown Error Occured during starting the server");
        process.exit(1);
    }
}

main();