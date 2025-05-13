import { NextResponse } from 'next/server';
import { badgeDefinitions } from '@/lib/badgeDefinitions.js';

export async function GET(request) {
  try {
    // No user authentication needed to see all possible badge definitions
    // We could add caching headers here if desired, as definitions rarely change
    return NextResponse.json(Object.values(badgeDefinitions), {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error("Error fetching badge definitions:", error);
    return NextResponse.json({ error: "Failed to fetch badge definitions" }, { status: 500 });
  }
} 