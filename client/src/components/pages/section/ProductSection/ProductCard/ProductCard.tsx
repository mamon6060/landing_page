"use client";
import { apiBaseUrl } from "@/src/config/config";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useAddToCartMutation } from "@/src/redux/features/cart/cartApi";
import { TProduct } from "@/src/types";
import toast from "react-hot-toast";

const ProductCard = ({ product }: { product: TProduct }) => {
  const { image, title, price, salePrice, offer } = product;
  const [addToCart] = useAddToCartMutation();
  const handleAddToCart = async () => {
    try {
      const params = {
        product: product,
        productId: product._id,
      };
      await addToCart({ params }).unwrap();
      toast.success("Product added to cart!", {
        position: "top-right", // position at the top-right corner
      });
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Failed to add product to cart. Please try again.", {
        position: "top-right", // position at the top-right corner
      });
    }
  };
  return (
    <div className="border rounded group duration-300 cursor-pointer">
      <div className="overflow-hidden relative">
        <Image
          src={apiBaseUrl + image}
          alt={title}
          width={500}
          height={500}
          className="group-hover:scale-105 duration-300"
        />
        {offer > 0 && (
          <motion.p
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="top-4 right-4 absolute w-[40px] h-[40px] bg-[#EF4444] rounded-full z-[50] flex items-center justify-center font-semibold text-[#fff]"
          >
            {offer}%
          </motion.p>
        )}
      </div>
      <div className="flex flex-col justify-center items-center pt-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-lg font-bold">
            <span className="text-lg font-extrabold">৳</span>
            <span className="">{salePrice}</span>
          </p>
          <p className="text-base font-medium text-[#EF4444] line-through">
            <span className="font-extrabold ml-1">৳</span>
            <span className="">{price}</span>
          </p>
        </div>
      </div>

      <div className="px-4 py-4">
        <button
          onClick={handleAddToCart}
          className="bg-[#EF4444] text-[#fff] capitalize text-sm font-semibold text-center py-3 rounded w-full flex items-center justify-center duration-300 relative overflow-hidden"
        >
          order now
          <span className="opacity-0 group-hover:opacity-[1] group-hover:translate-x-2 duration-300">
            <IoCartOutline className="text-xl font-semibold" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
