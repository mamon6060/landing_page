import { getProducts } from "@/src/services/products";
import ProductSlide from "./ProductSlide/ProductSlide";

/* eslint-disable react/no-unescaped-entities */
const Products = async () => {
  const products = await getProducts();
  console.log("all products", products);
  return (
    <div className="container my-8">
      <div className="text-center flex items-center justify-center flex-col py-4  rounded mx-1">
        <h2 className="flex items-center justify-center text-2xl font-semibold text-[#BE1E2D]">
          {/* {productList[0]?.category?.title} */}
          Men's Panjabi
        </h2>
        <p className="lg:w-[60%] w-full py-2">
          Explore our top-rated products, carefully selected based on customer
          reviews and expert recommendations.
        </p>
      </div>

      <div>
        <ProductSlide products={products}></ProductSlide>
      </div>
    </div>
  );
};

export default Products;
