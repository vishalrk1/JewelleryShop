import prismadb from "@/lib/prismadb";
import { apiErrorResponse } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const totalUsers = await prismadb.auth_user.count();
    const totalProducts = await prismadb.products_product.count({
      where: {
        prod_instock: true,
      },
    });
    const ordersPlaced = await prismadb.order_order.count();
    const totalItemsSold = await prismadb.order_orderitem.count();

    return NextResponse.json(
      {
        data: [
          {
            name: "Total Users",
            value: totalUsers,
          },
          {
            name: "Products Available",
            value: totalProducts,
          },
          {
            name: "Orders Placed",
            value: ordersPlaced,
          },
          {
            name: "Total Items Sold",
            value: totalItemsSold,
          },
        ],
      },
      { status: 200 }
    );
  } catch (error) {
    return apiErrorResponse();
  }
}
