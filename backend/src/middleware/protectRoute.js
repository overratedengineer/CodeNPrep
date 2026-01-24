import { requireAuth } from "@clerk/express";
import User from "../models/User.js";
import { connectDB } from "../lib/db.js";

export const protectRoute =[
      requireAuth(),
      async (req,res,next) => {
         try {
            const clerkId = req.auth().userId;
            if(!clerkId) return res.status(401).json({message:"Invalid"});
                await connectDB();
                const user = await User.findOne({clerkId});
            if(!user) return res.status(404).json({message : "User Not Found!"});

            req.User = user;
            next();
         } catch (error) {
            console.error("Error while protecting route",error);
            res.status(500).json({message:"Server Error"});
         }
      }
]
