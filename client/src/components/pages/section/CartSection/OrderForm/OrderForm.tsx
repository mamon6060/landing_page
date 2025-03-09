"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const OrderForm = ({ setSelectedDelivery }) => {
  //   const [isLoading, setIsLoading] = useState(false);

  const [selected, setSelected] = useState(0); // Default selected item

  const options = [
    { id: 0, label: "ঢাকার ভিতরে ডেলিভারি চার্জ", price: 60 },
    { id: 1, label: "ঢাকার বাইরে ডেলিভারি চার্জ", price: 120 },
    { id: 2, label: "ফ্রী ডেলিভারি চার্জ", price: "00" },
  ];

  type Inputs = {
    name: string;
    address: string;
    number: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h2 className="text-xl font-semibold">
        অর্ডার করতে নিচের ফর্মটি পূরন করুন
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-4"
      >
        <div className="">
          <label htmlFor="" className="block">
            আপনার নাম <abbr className="text-[#EF4444] text-xl">*</abbr>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input-text w-full mt-1 border border-[#EF4444]/20 p-2 rounded outline-none focus:border-[#EF4444]"
          />
          {errors.name && (
            <span className="text-[red]">Name field is required</span>
          )}
        </div>
        <div className="">
          <label htmlFor="address" className="block">
            আপনার ঠিকানা <abbr className="text-[#EF4444] text-xl">*</abbr>
          </label>
          <input
            type="text"
            {...register("address", { required: true })}
            className="input-text w-full mt-1 border border-[#EF4444]/20 p-2 rounded outline-none focus:border-[#EF4444]"
          />
          {errors.address && (
            <span className="text-[red]">Address field is required</span>
          )}
        </div>
        <div className="">
          <label htmlFor="phone" className="block">
            মোবাইল নাম্বার <abbr className="text-[#EF4444] text-xl">*</abbr>
          </label>
          <input
            type="tel"
            {...register("number", {
              required: "Number field is required",
              pattern: {
                value: /^\d{11}$/,
                message: "Number must be exactly 11 digits",
              },
            })}
            className="input-text w-full mt-1 border border-[#EF4444]/20 p-2 rounded outline-none focus:border-[#EF4444]"
          />
          {errors.number && (
            <span className="text-[red]">{errors.number.message}</span>
          )}
        </div>

        {/* <div className="grid lg:grid-cols-3 gap-2 mt-4">
          <div className="bg-[#FEF2F2] text-[12px] font-bold flex flex-col items-center justify-center py-2 rounded border border-[#F87171]">
            <p>ঢাকার ভিতরে ডেলিভারি চার্জ</p>
            <p className="text-lg">
              <span className="font-extrabold ml-1">৳</span>
              <span>60</span>
            </p>
          </div>
          <div className="bg-[#FEF2F2] text-[12px] font-bold flex flex-col items-center justify-center rounded">
            <p>ঢাকার বাইরে ডেলিভারি চার্জ</p>
            <p className="text-lg">
              <span className="font-extrabold ml-1">৳</span>
              <span>60</span>
            </p>
          </div>
          <div className="bg-[#FEF2F2] text-[12px] font-bold flex flex-col items-center justify-center rounded">
            <p>ফ্রী ডেলিভারি চার্জ</p>
            <p className="text-lg">
              <span className="font-extrabold ml-1">৳</span>
              <span>00</span>
            </p>
          </div>
        </div> */}

        <div className="grid lg:grid-cols-3 gap-2 mt-4">
          {options.map((option) => (
            <div
              key={option.id}
              className={`bg-[#FEF2F2] text-[12px] font-bold flex flex-col items-center justify-center py-2 rounded border 
              ${
                selected === option.id
                  ? "border-[#F87171]"
                  : "border-transparent"
              } cursor-pointer`}
              onClick={() => {
                setSelected(option.id);
                setSelectedDelivery(option.price);
              }}
            >
              <p>{option.label}</p>
              <p className="text-lg">
                <span className="font-extrabold ml-1">৳</span>
                <span>{option.price}</span>
              </p>
            </div>
          ))}
        </div>
        <div>
          <button
            type="submit"
            className="bg-[#F87171] hover:bg-[#EF4444] duration-300 text-white px-6 py-3 rounded mt-4 w-full text-sm font-semibold"
            // disabled={isLoading}
          >
            {/* {isLoading ? "Processing..." : `Place Order ৳ ${"00" || "00"}`} */}
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
