import { order_orderitem } from "@prisma/client";
import React from "react";

interface OrderItemCardProps {
  orderItem: any;
}

const OrderItamCard: React.FC<OrderItemCardProps> = ({ orderItem }) => {
  return (
    <div className="w-fit md:w-2/5 h-max flex mt-3 items-center md:mt-5 rounded-lg shadow-sm">
      <div className="flex items-center justify-center w-max h-max p-2">
        <img
          src={orderItem?.products_product?.prod_image_url}
          className="w-20 md:w-32 h-full md:h-20 object-cover rounded-lg"
          alt=""
        />
      </div>
      <div className="w-full p-2 flex my-2">
        <div className="flex flex-col w-full items-centerc justify-center">
          <div className="text-sm md:text-lg font-bold">
            {orderItem?.products_product?.prod_title}
          </div>
          <div className="flex w-full items-start mt-1 md:mt-2 divide-x divide-solid divide-gray-400">
            <div className="text-gray-600 font-bold text-xs md:text-base">
              Price:
              <span className="text-gray-700 font-normal text-xs md:text-base">{` ₹${
                orderItem?.products_product?.prod_price * orderItem?.quantity
              }`}</span>
            </div>
            <div className="text-gray-600 font-bold text-xs md:text-base ml-3 pl-3">
              Quantity:
              <span className="text-gray-700 font-normal text-xs md:text-base">{` ${orderItem?.quantity}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItamCard;
