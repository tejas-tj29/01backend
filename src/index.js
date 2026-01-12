import dbConnect from './db/db_connect.js'
import dotenv from 'dotenv'
import {app} from './app.js'
dotenv.config({
    path:'./env'
})
dbConnect()
.then(()=>{
    app.on("error",(error) => {
        console.log("Error:",error);
        throw error
    })
    app.listen((process.env.port||5000),()=>{
        console.log(`Server is running at Port:${process.env.port}`);
    })
    app.get('/',(req,res)=>{
        res.send("DB connected and server is running");
    })
})
.catch((error)=>{
    console.log("MongoDB failed to connect",error);
})