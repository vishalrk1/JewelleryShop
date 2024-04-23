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
