import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();
    const { xpAmount, reason } = await req.json();

    if (!xpAmount || typeof xpAmount !== 'number') {
      return new Response(JSON.stringify({ error: "Invalid XP amount" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find user and update XP
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update XP
    user.xp += xpAmount;

    // Calculate and update level (every 1000 XP = 1 level)
    const newLevel = Math.floor(user.xp / 1000) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
    }

    await user.save();

    return new Response(JSON.stringify({ 
      success: true,
      newXp: user.xp,
      newLevel: user.level,
      xpGained: xpAmount,
      reason
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error updating XP:", error);
    return new Response(JSON.stringify({ error: "Failed to update XP" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 