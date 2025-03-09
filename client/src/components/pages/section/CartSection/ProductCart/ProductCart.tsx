/* eslint-disable react/no-unescaped-entities */
"use client";

import { apiBaseUrl } from "@/src/config/config";
import { useAppDispatch } from "@/src/redux/app/hooks";

import {
  useDeleteSingleCartMutation,
  useGetCartsQuery,
} from "@/src/redux/features/cart/cartApi";
import { updateQuantity } from "@/src/redux/features/cart/cartSlice";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

const ProductCart = ({ selectedDelivery }) => {
  // const [quantity, setQuantity] = useState(1);
  const { data: carts } = useGetCartsQuery("");
  const dispatch = useAppDispatch();

  const [deleteSingleCart, { isLoading }] = useDeleteSingleCartMutation();

  const handleDelete = async (cartId) => {
    try {
      await deleteSingleCart(cartId).unwrap();
      toast.success("Item deleted successfully", {
        position: "top-right", // position at the top-right corner
      });
    } catch (error) {
      toast.success("Item deleted successfully", {
        position: "top-right", // position at the top-right corner
      });
    }
  };

  const handleQuantityChange = (cartId, newQuantity) => {
    dispatch(updateQuantity({ id: cartId, quantity: newQuantity }));
  };
  console.log("handleQuantityChange", handleQuantityChange);

  // Calculate total price
  const totalPrice = carts?.data?.reduce((total, cart) => {
    return total + cart?.productId?.salePrice * cart.quantity;
  }, 0);

  const totalAmount = Number(totalPrice) + Number(selectedDelivery);

  return (
    <div className="lg:ml-12">
      <h2 className="text-xl font-semibold">আপনার অর্ডার</h2>

      <div>
        <div>
          {carts?.data?.map((cart) => (
            <div
              key={cart._id}
              className="mt-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    className="border p-1 rounded"
                    src={apiBaseUrl + cart?.productId?.image}
                    alt={cart.title}
                    width={80}
                    height={80}
                  />
                  <p
                    onClick={
                      !isLoading ? () => handleDelete(cart._id) : undefined
                    }
                    className="w-[25px] h-[25px] bg-[#F87171] text-[#fff] rounded-full flex items-center justify-center absolute right-[-8px] top-[-12px] border cursor-pointer hover:border-[#262626] duration-300"
                  >
                    <RiDeleteBinLine className="text-sm" />
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="md:text-lg text-sm font-medium">
                    {cart?.productId?.title}
                  </h2>
                  <div className="flex items-center">
                    <div className="border border-[#EF4444]/40 text-[#EF4444] w-6 h-6 cursor-pointer flex items-center justify-center rounded hover:bg-red-700">
                      <IoIosArrowDown
                        onClick={() => {
                          handleQuantityChange(cart._id, cart.quantity - 1);
                        }}
                      />
                    </div>
                    <span className="mx-2 font-semibold">{cart.quantity}</span>

                    <div className="border border-[#EF4444]/40 text-[#EF4444] w-6 h-6 cursor-pointer flex items-center justify-center rounded">
                      <IoIosArrowUp
                        onClick={() =>
                          handleQuantityChange(cart._id, cart.newQuantity + 1)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-lg">
                  <span className="font-extrabold ml-1">৳</span>

                  <span>{cart?.productId?.salePrice * cart.quantity}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <h2>ডেলিভারি চার্জ</h2>
          <p className="text-lg">
            <span className="font-extrabold ml-1">৳</span>
            <span>{selectedDelivery}</span>
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 border-t">
          <h2 className="mt-1">মোট মূল্য</h2>
          <p className="text-lg mt-1">
            <span className="font-extrabold ml-1">৳</span>
            <span>{totalAmount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
