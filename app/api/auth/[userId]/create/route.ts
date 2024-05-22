import prismadb from "@/lib/prismadb";
import { AddressDetailsSchema, UserDetailsFormSchema } from "@/schemas";
import { create } from "domain";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const searchParam = req.nextUrl.searchParams;

  const userDetails = Object.fromEntries(searchParam) as z.infer<
    typeof UserDetailsFormSchema
  >;
  const addressDetails = Object.fromEntries(searchParam) as z.infer<
    typeof AddressDetailsSchema
  >;
  try {
    // getting unique user
    const user = await prismadb.auth_user.update({
      data: {
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
      },
      where: {
        id: parseInt(params.userId),
      },
    });

    if (!user) return new Response("User not found", { status: 404 });

    // creating user profile
    const userData = await prismadb.main_userprofile.create({
      data: {
        auth_user: {
          connect: {
            id: parseInt(params.userId),
          },
        },
        user_gender: userDetails.user_gender,
        user_pfp_url: userDetails.user_pfp_url,
        user_phone: userDetails.user_phone,
        user_pfp: "",
        main_useraddress: {
          create: {
            address_line1: addressDetails.address_line1,
            address_line2: addressDetails.address_line2,
            city: addressDetails.city,
            state: addressDetails.state,
            country: addressDetails.country,
            address_type: addressDetails.address_type,
            postal_code: addressDetails.postal_code,
          },
        },
      },
      include: {
        main_useraddress: true,
      },
    });

    if (!userData)
      return new Response("User profile not created", { status: 500 });

    return NextResponse.json(
      {
        user: user,
        userData: userData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response("Failed to create user profile", { status: 500 });
  }
}
