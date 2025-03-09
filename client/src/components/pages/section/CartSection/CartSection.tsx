"use client";
import React, { useState } from "react";
import OrderForm from "./OrderForm/OrderForm";
import ProductCart from "./ProductCart/ProductCart";

const CartSection = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(60);
  return (
    <div className="py-6 container pb-20">
      <h2 className="text-center lg:text-2xl text-xl font-semibold lg:px-28">
        প্রোডাক্ট হাতে নিয়ে কোয়ালিটি দেখে পেমেন্ট করুন, কোয়ালিটি ভালো না
        লাগলে ডেলিভারি চার্জ দিয়ে রিটার্ন করুন।
      </h2>

      <div className="grid lg:grid-cols-2 gap-12 py-12 border rounded mt-12 px-8">
        <div className="">
          <OrderForm setSelectedDelivery={setSelectedDelivery}></OrderForm>
        </div>
        <div className="lg:border-l">
          <ProductCart selectedDelivery={selectedDelivery}></ProductCart>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
