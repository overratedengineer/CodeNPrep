import express, { Router } from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { createSessions, endSession, getActiveSessions, getRecentSessions, getSessionById, joinSession } from "../controllers/sessionController.js"
const router = express.Router()

router.post("/",protectRoute,createSessions)
router.get("/active",protectRoute,getActiveSessions)
router.get("/recent",protectRoute,getRecentSessions)
router.get("/:id",protectRoute,getSessionById)
router.post("/:id/join",protectRoute,joinSession)
router.post("/:id/join",protectRoute,endSession)
export default router