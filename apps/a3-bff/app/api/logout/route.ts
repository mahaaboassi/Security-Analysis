import { NextResponse } from "next/server";
import redis from "../../../lib/redis";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    
    // extract sessionId from cookies
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("sessionId")?.value;
    if (sessionId) {
        // Delete session from Redis
        await redis.del(`session:${sessionId}`);
    }
    if (!sessionId) {
        return NextResponse.json(
            { 
            err: 1,
            msg: "Unauthorized",
            data: [],
            statusCode: 401
            },
            { status: 401 }
        );
    }

    cookieStore.delete("sessionId");
    
    const response = NextResponse.json({
        err : 0,
        msg: "Logout successfully",
        data: [],
        statusCode: 200
    }, {
        status: 200,
    });


    return response;
}