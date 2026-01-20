import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import {connectDB} from "./lib/db.js";
import cors from "cors";
import { inngest } from "./lib/inngest.js";
import {serve} from "inngest/express"
import { functions } from "./lib/inngest.js";


const app = express();
const __dirname = path.resolve()
app.use(express.json())
app.use(cors({
    origin: ENV.NODE_ENV === "production" ? true : ENV.CLIENT_URL,
    credentials: true
  }));
  
app.use("/api/inngest",serve({client:inngest},functions))
app.get("/hello",(req,res)=>{
    res.status(200).json({msg:"hey"})
})

if (ENV.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("/{*}",(req,res)=>{
       res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    })
}

const startServer = async() => {
try {
       await connectDB();
    app.listen(ENV.PORT ,()=>console.log("Running"));
} catch (error) {
    console.error(error);
}
}
startServer()