import  Session  from "../models/Session.js";
import { chatClient, streamClient } from "../lib/stream.js";

export async function createSessions(req,res) {
    try {
        const {problem,difficulty} = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId

        if (!problem||!difficulty) {
            return res.status(400).json({
                message :"Problem and Difficulty are required"
            })
        }
        const callId = crypto.randomUUID();
       const session = Session.create({
        problem,
        difficulty,
        host: userId,
        callId
       })
       await streamClient.video.call("default",callId).getOrCreate({
        data:{
            created_by_id: clerkId,
            custom:{problem,difficulty,sessionId: session._id.toString()}
        }
       })
       const channel = chatClient.channel("messaging",callId,{
        name : '${problem}',
        created_by_id:clerkId,
        members:[clerkId]
       })

       await channel.create()
       res.status(201).json({Session})
    } catch (error) {
        console.log("Creating session failed",error.message)
        res.status(500).json({message:"Server Error"});

    }
}
export async function getActiveSessions(_,res) {
    try {
        const sessions = await Session.find({status:"active"}).populate("host","name profileImage email clerkId").sort({createdAt:-1}).limit(20);
        res.status(200).json({sessions});
    } catch (error) {
        console.log("Error in getActiveSessions ",error.message)
        res.status(500).json({message:"Server Error"});

    }
}
export async function getRecentSessions(req,res) {
    try {
        const userId = req.user._id;
        const sessions = await Session.find({
            status:"completed",
            $or : [{host:userId } , {participant:userId}]
        }
        ).sort({createdAt:-1}).limit(20);

        res.status(200).json({sessions});
    } catch (error) {
        console.log("Error in getRecentSessions",error.message)
        res.status(500).json({message:"Server Error"});

    }
}
export async function getSessionById(req,res) {
    try {
        const {id} = req.params
        const session = await Session.findById(id).populate("host","name email profileImage clerkId").populate("participant","name email profileImage clerkId");
        if(!session) return res.status(404).json({message:"Session not found"})
            res.status(200).json({session})
    } catch (error) {
        console.log("Error in getSessionById",error.message)
        res.status(500).json({message:"Server Error"});
    }
}
export async function joinSession(req,res) {
    try {
        const {id} = req.params
        const userId = req.user._id
        const clerkId = req.user.clerkId
        const session = await Session.findById(id)
        if(!session) return res.status(404).json({message:"Session not found"})
        if (session.status!=="active") return res.status(400).json({message:"Cannot join a completed session"})
            if (session.host.toString()===session.participant.toString()) return res.status(400).json({message:"Host can not join their qwn session as participant"})
        if(session.participant) return res.status(409).json({message:"Session is full"})
   
            session.participant=userId
            await session.save()
            const channel = chatClient.channel("messaging",session.callId)
            await channel.addMembers([clerkId])
            res.status(200).json({session})

    } catch (error) {
        console.log("Error in joinSession",error.message)
        res.status(500).json({message:"Server Error"});
    }
}
export async function endSession(req,res) {
try {
    const {id} = req.params
    const userId = req.user._id
    const session = await Session.findById(id)
    if(!session) return res.status(404).json({message:"Session not found"})
    if(session.host.toString()!==userId.toString()) return res.status(403).json({message:"Only host can end the session"})
    if(session.status==="completed") return res.status(400).json({message:"Session is already completed"})
      
    const call = streamClient.video.call("default",callId)
    await call.delete();
    const channel = chatClient.channel("messaging",callId)
    await channel.delete()
    session.status="completed"
    await session.save()
    return res.status(200).json({message:"Session ended"})
  

   } catch (error) {
    console.log("Error in endSession",error.message)
        res.status(500).json({message:"Server Error"}); 
    }


  

}