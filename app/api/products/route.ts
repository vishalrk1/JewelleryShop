import prismadb from "@/lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";

// Extend the global BigInt object with a toJSON method
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
    const catId = req.nextUrl.searchParams.get("catId");
    const isFeatured = req.nextUrl.searchParams.get("isFeatured");
    console.log("isFeatured", isFeatured);

    if (!catId) {
      return new NextResponse("Category ID is required", {
        status: 404,
      });
    }

    const productsData =
      isFeatured === "true"
        ? await prismadb.products_product.findMany({
            where: {
              category_id: parseInt(catId, 10),
              is_featured: true,
            },
            include: {
              categories_category: true,
            },
          })
        : await prismadb.products_product.findMany({
            where: {
              category_id: parseInt(catId, 10),
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
    console.log(error);
    return new NextResponse("Interal server error, failed to get products", {
      status: 404,
    });
  }
}
