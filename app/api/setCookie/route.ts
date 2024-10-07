import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { token } = await req.json();
  console.log("POST TOKEN: ", token);

  // Set the cookie
  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    })
  );

  res.status(200).json({ message: "Auth cookie set successfully" });
}
