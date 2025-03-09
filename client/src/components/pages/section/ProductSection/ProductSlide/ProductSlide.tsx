import ProductCard from "../ProductCard/ProductCard";

const ProductSlide = ({ products }) => {
  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
        {products?.data?.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default ProductSlide;
