import React from "react";
import { convertDate } from "../../utils/dateUtils";
import { twMerge } from "tailwind-merge";
import OrderItamCard from "../../components/Cards/OrderItemCard";
import { Order, OrderItem } from "@/lib/types";

interface Props {
  orderData: Order;
}

const OrdersContainer: React.FC<Props> = ({ orderData }) => {
  return (
    <div className="flex flex-col h-max border-2 border-solid border-gray-300 rounded-lg mt-4">
      <div className="flex flex-col md:flex-row flex-1 bg-gray-100 h-10 rounded-lg rounded-b-none p-4 divide-y-2 divide-gray-300 md:divide-y-0">
        <div className="flex flex-2 gap-8">
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-xs md:text-base text-gray-600">ORDER PLACED</p>
            {orderData?.updatedAt && (
              <p className="text-xs md:text-sm text-gray-700 font-bold">
                {convertDate(orderData?.updatedAt)}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-xs md:text-base text-gray-600">TOTAL</p>
            <p className="text-xs md:text-sm text-gray-700 font-bold">
              {`${orderData?.totalAmount}`}
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-start justify-start gap-1">
            <p className="text-xs md:text-base text-gray-600">SHIP TO</p>
            <p className="text-xs md:text-sm text-gray-700 font-bold">
              {orderData.shippingAddress?.address_line1}
            </p>
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center mt-3 md:mt-0">
          <div className="flex-col gap-1">
            <p className="text-xs md:text-base text-gray-600 mt-3 md:mt-0">
              ORDER #{" "}
              <span className="text-gray-700 font-bold">{orderData?._id}</span>
            </p>
            <p className="text-xs md:text-base text-gray-600 mt-1">
              PAYMENT STATUS:{" "}
              <span
                className={twMerge(
                  orderData?.orderStatus === "delivered"
                    ? "text-green-600 font-bold text-xs md:text-base"
                    : "text-red-600 font-bold text-xs md:text-base"
                )}
              >
                {orderData?.paymentStatus === "paid" ? "Paid" : "Pending"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-50 rounded-lg p-4 ">
        <p
          className={twMerge(
            "text-sm md:text-xl font-bold",
            orderData?.orderStatus === "delivered"
              ? "text-gray-600"
              : "text-green-800"
          )}
        >
          {orderData?.orderStatus === "delivered"
            ? "Order Delivered"
            : "Arriving Soon"}
        </p>
        <div className="flex flex-col items-start md:flex-row md:flex-wrap md:items-center justify-start gap-3 w-full">
          {orderData?.items?.map((item: OrderItem, index: number) => (
            <OrderItamCard orderItem={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersContainer;
