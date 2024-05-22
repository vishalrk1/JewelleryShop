import prismadb from "@/lib/prismadb";
import { apiErrorResponse } from "@/utils/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

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

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await req.json();
    const {
      prod_title,
      prod_image_url,
      prod_desc,
      prod_price,
      prod_old_price,
      prod_specs,
      prod_instock,
      is_featured,
      category_id,
      userId,
    } = body;

    console.log(body);

    if (
      !prod_title ||
      !prod_image_url ||
      !prod_desc ||
      !prod_price ||
      !category_id ||
      !userId ||
      !prod_old_price ||
      !prod_specs
    ) {
      console.log("Missing required fields");
      return apiErrorResponse();
    }

    const user = await prismadb.auth_user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user || !user.is_staff) {
      return new NextResponse("Unauthorized User", {
        status: 401,
      });
    }

    const updatedProduct = await prismadb.products_product.create({
      data: {
        prod_id: uuidv4(),
        prod_title: prod_title,
        prod_image_url: prod_image_url,
        prod_desc: prod_desc,
        prod_price: prod_price,
        prod_old_price: prod_old_price,
        prod_specs: prod_specs,
        prod_instock: prod_instock,
        is_featured: is_featured,
        prod_date_updated: new Date(),
        prod_date_added: new Date(),
        prod_image_file: "",
        categories_category: {
          connect: {
            cat_id: category_id,
          },
        },
      },
    });
    return NextResponse.json(
      {
        message: "Product updated successfully",
        productData: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Interal server error, failed to get products", {
      status: 404,
    });
  }
}
