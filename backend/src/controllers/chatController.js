import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req,res) {
    
    try {
        const token = chatClient.createToken(req.user.clerkId)
        res.status(200).json({
            token,
            userID : req.user.clerkId,
            userName : req.user.name,
            userImage: req.user.image,
        })
    } catch (error) {
        console.log("Stream token built failed",error.message)
        res.status(500).json({message:"Server Error"});

    }
}