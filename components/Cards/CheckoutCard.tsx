import { RootState } from "@/redux/store/store";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
// import AddressDropdown from "./AddressDropdown";

const CheckoutCard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { cart, cartItems } = useSelector((state: RootState) => state.cart);
  const [addressType, setAddressType] = useState("Home");
  const [phone, setPhone] = useState("");
  const [cartValue, setCartValue] = useState(0);
  const [convenienceFee, setConvenienceFee] = useState(150);

  useEffect(() => {
    if (cartItems.length > 0) {
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

  return (
    <div className="w-full p-5 md:mt-5 text-sm md:text-base flex justify-center font-poppins">
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
          <Button type="submit" onClick={() => {}}>
            Place Order
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutCard;
