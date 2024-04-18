import prismadb from "@/lib/prismadb";
import { apiErrorResponse } from "@/utils/utils";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

// Extend BigInt prototype with a toJSON method
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const categories = await prismadb.categories_category.findMany({});
    return NextResponse.json(
      { message: "Categories fetched successfully", categories },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorResponse();
  }
}
