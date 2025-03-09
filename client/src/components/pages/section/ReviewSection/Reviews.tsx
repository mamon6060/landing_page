import { getReviews } from "@/src/services/reviwes";
import ReviewesSlider from "./ReviewesSlider/ReviewesSlider";

const Reviews = async () => {
  const reviews = await getReviews();
  console.log("reviews data", reviews);
  return (
    <div>
      <ReviewesSlider reviews={reviews}></ReviewesSlider>
    </div>
  );
};

export default Reviews;
