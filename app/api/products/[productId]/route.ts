import prismadb from "@/lib/prismadb";
import { apiErrorResponse } from "@/utils/utils";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export function getRouteId(url: string) {
  var regex = /\/products\/(\d+)/;
  const match = url.match(regex);
  return match;
}

export async function GET(req: NextRequest, res: NextApiResponse) {
  const match = getRouteId(req.nextUrl.pathname);
  if (!match) {
    return new NextResponse(
      "Failed to delete saveed item, item Id is required",
      {
        status: 404,
      }
    );
  }

  const prodId = match[1];
  try {
    const productData = await prismadb.products_product.findUnique({
      where: {
        id: parseInt(prodId),
      },
    });
    return NextResponse.json({ data: productData }, { status: 200 });
  } catch (error) {
    return apiErrorResponse();
  }
}

export async function PATCH(
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
      return apiErrorResponse();
    }

    const productData = await prismadb.products_product.findUnique({
      where: {
        id: Number(params.productId),
      },
    });

    if (!productData) {
      console.log("Product not found");
      return apiErrorResponse();
    }

    const updatedProduct = await prismadb.products_product.update({
      where: {
        id: Number(params.productId),
      },
      data: {
        prod_title: prod_title,
        prod_image_url: prod_image_url,
        prod_desc: prod_desc,
        prod_price: prod_price,
        prod_old_price: prod_old_price,
        prod_specs: prod_specs,
        prod_instock: prod_instock,
        is_featured: is_featured,
        prod_date_updated: new Date(),
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    await prismadb.products_product.delete({
      where: {
        id: Number(params?.productId),
      },
    });
    return NextResponse.json(
      {
        message: "Product deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorResponse();
  }
}
