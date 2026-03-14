import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Allow up to 60s for this batch job

async function isAdmin(userId) {
  await connectToDatabase();
  const user = await User.findOne({ clerkId: userId });
  return user?.role === "ADMIN";
}

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId || !(await isAdmin(userId))) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    // Find all users without an email
    const usersWithoutEmail = await User.find(
      { $or: [{ email: null }, { email: { $exists: false } }, { email: "" }] },
      { _id: 1, clerkId: 1 }
    ).lean();

    const client = await clerkClient();
    const results = { updated: 0, failed: 0, skipped: 0, errors: [] };

    for (const user of usersWithoutEmail) {
      try {
        const clerkUser = await client.users.getUser(user.clerkId);
        const email =
          clerkUser.emailAddresses?.[0]?.emailAddress || null;

        if (!email) {
          results.skipped++;
          continue;
        }

        // Use updateOne to avoid unique constraint issues
        const updateResult = await User.updateOne(
          { _id: user._id, $or: [{ email: null }, { email: { $exists: false } }, { email: "" }] },
          { $set: { email } }
        );

        if (updateResult.modifiedCount > 0) {
          results.updated++;
        } else {
          results.skipped++;
        }
      } catch (e) {
        results.failed++;
        results.errors.push({
          userId: user._id.toString(),
          clerkId: user.clerkId,
          error: e.message,
        });
      }
    }

    return new Response(
      JSON.stringify({
        message: "Email backfill complete",
        totalWithoutEmail: usersWithoutEmail.length,
        ...results,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Backfill error:", error);
    return new Response(
      JSON.stringify({ error: "Backfill failed", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
