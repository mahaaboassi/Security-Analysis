import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import redis from "../../../lib/redis";
//Shared components
import { Helper } from "@repo/utils/src/helper";


export async function POST(req: Request) {
    
    const body = await req.json();
    const result = await Helper({
        url: "http://localhost:5000/auth/login",
        method: "POST",
        body, 
    });

    let dataReturned = result
    // extract Token from result
    if(Object.keys(result.data).length > 0 && result.err != 1 ) {
        let { accessToken, ...rest} = result.data
        dataReturned.data = rest
        // create random session id
        const sessionId = crypto.randomUUID();
        // Save token in Redis
        await redis.set(
            `session:${sessionId}`,
            accessToken,
            {
            EX: 60 * 60 // 1 hour
            }
        );

        // Save ONLY session id in browser cookie
        const cookieStore = await cookies();

        cookieStore.set("sessionId",sessionId,{
            httpOnly:true,
            secure:true,
            sameSite:"lax",
            maxAge:3600
            }
        );
    }
    const response = NextResponse.json(dataReturned, {
        status: result.status,
    });

    return response;
}