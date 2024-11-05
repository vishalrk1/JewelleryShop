"use server";

import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { token } = await req.json();
  console.log("POST TOKEN: ", token);

  // Set the cookie
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set("auth_token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: oneDay,
  });

  return NextResponse.json(
    { message: "Auth cookie set successfully" },
    { status: 200 }
  );
}
