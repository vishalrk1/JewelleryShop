import prismadb from "@/lib/prismadb";
import { apiErrorResponse, apiResponse } from "@/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  const user_id = req.nextUrl.searchParams.get("id"); // id here is user id
  try {
    if (!user_id) {
      return apiResponse({ message: "User id is required", status: 404 });
    }

    const orders = await prismadb.order_order.findMany({
      where: {
        user_id: parseInt(user_id),
      },
      include: {
        main_useraddress: true,
        order_orderitem: {
          include: {
            products_product: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        message: "Orders fetched successfully!",
        orders: orders,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return apiErrorResponse();
  }
}
