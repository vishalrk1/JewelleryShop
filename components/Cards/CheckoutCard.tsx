import { RootState } from "@/redux/store/store";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { showErrorToast } from "@/utils/toasts";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// import AddressDropdown from "./AddressDropdown";

const CheckoutCard = () => {
  const { user, userData } = useSelector((state: RootState) => state.auth);
  const { cart, cartItems } = useSelector((state: RootState) => state.cart);
  const [addressType, setAddressType] = useState("Home");
  const [phone, setPhone] = useState("");
  const [cartValue, setCartValue] = useState(0);
  const [convenienceFee, setConvenienceFee] = useState(150);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItems?.length > 0) {
      let cartTotal = cartItems.reduce((acc, item) => {
        return acc + item?.products_product?.prod_price * item?.quantity;
      }, 0);
      setCartValue(cartTotal);
      if (cartTotal > 1000) {
        setConvenienceFee(0);
      } else {
        setConvenienceFee(150);
      }
    }
  }, [cartItems]);

  const handelCheckout = async () => {
    try {
      setLoading(true);
      const orderId = uuidv4();
      const res = await axios.post(
        `http://localhost:3000/api/orders/${orderId}/checkout`,
        {},
        {
          params: {
            userId: user?.id,
            email: user?.email,
            cartId: cart?.id,
            addressId: userData?.main_useraddress[0].id,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        window.location.assign(res.data.url);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      showErrorToast("Something went wrong cant procced order right now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-max p-5 md:mt-5 text-sm md:text-base flex justify-center font-poppins">
      <div className="w-50 md:w-96 h-50 md:h-90 p-5 rounded-xl bg-white border text-center ">
        <h2 className="text-black mb-5 font-bold">Enter your details</h2>
        <form className="flex flex-col">
          <label className="text-left mb-1 mt-2" htmlFor="email">
            E-mail
          </label>
          {user && (
            <input
              className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
              name="email"
              type="text"
              id="username"
              placeholder={user?.email}
              disabled
            />
          )}
          <label className="text-left mb-1 mt-2" htmlFor="email">
            User Name
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="email"
            type="text"
            id="username"
            placeholder="Full name on card"
            value={`${user?.first_name} ${user?.last_name}`}
            readOnly
            disabled
          />
          <label className="text-left mb-1 mt-2" htmlFor="email">
            Phone
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="phone"
            type="text"
            id="username"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {/* <AddressDropdown
            labelText="Address"
            selectedValue={addressType}
            onSelectChange={setAddressType}
            options={userObject?.address.map((addr) => {
              return addr.address_line1;
            })}
            values={userObject?.address.map((addr) => {
              return addr.address_type;
            })}
          /> */}
          <div className="mt-4 p-2 font-bold text-sm md:text-base border-b">
            Order Summary
          </div>

          <div className="text-sm md:text-base p-1 w-full flex items-center justify-between">
            <div className="text-gray-600">Cart Total</div>
            <div className="font-bold">{cartValue}</div>
          </div>

          <div className="text-sm md:text-base p-1 w-full flex items-center justify-between">
            <div className=" text-gray-600">Convenience Fee</div>
            <div className=" font-bold">{convenienceFee}</div>
          </div>

          <div className="text-sm mb-4 md:text-base p-1 w-full flex items-center justify-between">
            <div className=" text-gray-600">Order Total</div>
            <div className=" font-bold">{convenienceFee + cartValue}</div>
          </div>
          <Button type="submit" onClick={handelCheckout} disabled={loading}>
            Checkout
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutCard;
