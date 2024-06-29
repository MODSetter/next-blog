import { NextResponse, NextRequest } from "next/server";
import { onLogin } from "@/actions/auth.actions";
import { ratelimit } from "@/lib/ratelimiter";

export async function POST(req: NextRequest) {
    const ip = req.ip ?? "127.0.0.1";
    const {success, pending, limit, reset, remaining} = await ratelimit.limit(
      ip
    );
    if(!success){
      return NextResponse.json({
          error: "Rate Limited : Issued Timeout"
      })
    }

  const datareceived = await req.json();
//   console.log("Inrouter", datareceived);

  const res = await onLogin(datareceived);

  // At Failed Login
  if (res?.error) {
    return NextResponse.json({
      error: "Incorrect Username or Password",
    });
  }

  if (res?.message) {
    return NextResponse.json({
      message: "Successfully LoggedIn",
    });
  }
}
