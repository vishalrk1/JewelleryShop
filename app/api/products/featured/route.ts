import prismadb from "@/lib/prismadb";
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

export async function GET(req: NextRequest) {
  try {
    const productsData = await prismadb.products_product.findMany({
      where: {
        is_featured: true,
      },
      include: {
        categories_category: true,
      },
    });
    if (!productsData) {
      return new NextResponse("Internal server error", {
        status: 404,
      });
    }
    return NextResponse.json(productsData);
  } catch (error) {
    return new NextResponse("Interal server error, failed to get products", {
      status: 404,
    });
  }
}
