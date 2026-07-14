import type { Application, Request, Response } from "express";
import express from "express"
import status from "http-status";
import notFound from "./middleware/notFound";

const app: Application = express();



//? making the root route
app.get('/', (req: Request, res: Response) => {

    const uptime = Math.floor(process.uptime());

    const months = Math.floor(uptime / (30 * 24 * 60 * 60));
    const days = Math.floor((uptime % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
    const hours = Math.floor((uptime % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = uptime % 60;
    return res.status(status.OK).json({
        success: true,
        statusCode: status.OK,
        message: "This is the root Route",
        author: {
            name: "Md. Sakib Hossen",
            role: "Full Stack Developer",
            github: "https://github.com/sakib404-hub",
            email: "akibhossainsakib1040@gmail.com"
        },
        server: {
            name: "Subscription Model",
            version: "1.0.0",
            uptime: `${months} month(s), ${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)`,
        }
    })
})





//? if no route mathces
app.use(notFound);

export default app;