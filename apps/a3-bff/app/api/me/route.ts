import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import redis from "../../../lib/redis";
//Shared components
import { Helper } from "@repo/utils/src/helper";


export async function GET(req: Request) {
    
    // extract sessionId from cookies
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("sessionId")?.value;
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
    // extract Token from Redis
    const accessToken = await redis.get(`session:${sessionId}`)
    if (!accessToken) {
        return NextResponse.json(
            { 
            err: 1,
            msg: "Session expired",
            data: [],
            statusCode: 401
            },
            { status: 401 }
        );
    }
    const result = await Helper({
        url: "http://localhost:5000/auth/me",
        method: "GET",
        token: accessToken
    });

    const response = NextResponse.json(result, {
        status: result.status,
    });

    return response;
}