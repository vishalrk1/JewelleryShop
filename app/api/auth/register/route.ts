import prismadb from "@/lib/prismadb";
import { Prisma } from "@prisma/client";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const email = req.nextUrl.searchParams.get("email");
  const password = req.nextUrl.searchParams.get("password");
  const name = req.nextUrl.searchParams.get("name");

  try {
    if (!email || !password || !name) {
      return new NextResponse("Failed to register user, try again later", {
        status: 404,
      });
    }

    const emailCnt = await prismadb.auth_user.count({
      where: {
        email: email,
      },
    });

    if (emailCnt > 0) {
      return new NextResponse(
        "This email is already used try again with different Email",
        {
          status: 404,
        }
      );
    }

    const user = await prismadb.auth_user
      .create({
        data: {
          email: email,
          password: password,
          date_joined: new Date(),
          is_active: true,
          is_staff: false,
          is_superuser: false,
          last_login: new Date(),
          username: name,
          first_name: "",
          last_name: "",
          cart_cart: {
            create: {
              cart_id: uuidv4(),
              created_at: new Date(),
              updated_at: new Date(),
            },
          },
          Wishlist: {
            create: {},
          },
        },
      })
      .catch((e: Prisma.PrismaClientKnownRequestError) => {
        if (e.code === "P2002") {
          return NextResponse.json(
            { message: "User already exists" },
            {
              status: 404,
            }
          );
        }
      });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to register user", {
      status: 400,
    });
  }
}
