import { connectDB } from "../src/lib/db.js";
import User from "../src/models/User.js";
import { upsertStreamUser } from "../src/lib/stream.js";
import { ENV } from "../src/lib/env.js";

// Mock Data
const mockUser = {
    clerkId: "debug-user-" + Date.now(),
    email: `debug-${Date.now()}@test.com`,
    name: "Debug User",
    profileImage: "https://via.placeholder.com/150",
};

const runDebug = async () => {
    console.log("🚀 Starting Debug Script...");
    console.log("Checking ENV variables...");
    console.log("DB_URL present:", !!ENV.DB_URL);
    console.log("STREAM_API_KEY present:", !!ENV.STREAM_API_KEY);
    console.log("STREAM_API_SECRET present:", !!ENV.STREAM_API_SECRET);

    try {
        console.log("1️⃣ Connecting to MongoDB...");
        await connectDB();
        console.log("✅ MongoDB Connected");

        console.log("2️⃣ Creating User in MongoDB...");
        const user = await User.create(mockUser);
        console.log("✅ User created in MongoDB:", user);

        console.log("3️⃣ Upserting User to Stream...");
        await upsertStreamUser({
            id: user.clerkId,
            name: user.name,
            image: user.profileImage,
        });
        console.log("✅ User upserted to Stream");

        console.log("4️⃣ Validating MongoDB persistence...");
        const foundUser = await User.findOne({ clerkId: mockUser.clerkId });
        if (foundUser) {
            console.log("✅ Verified: User exists in DB");
        } else {
            console.error("❌ Error: User NOT found in DB after creation!");
        }

        console.log("🧹 Cleanup: Deleting debug user...");
        await User.deleteOne({ _id: user._id });
        console.log("✅ Cleanup done");

        process.exit(0);
    } catch (error) {
        console.error("❌ DEBUG FAILED:", error);
        process.exit(1);
    }
};

runDebug();
