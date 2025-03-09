import Banner from "../components/pages/section/BannerSection/Banner";
import CartSection from "../components/pages/section/CartSection/CartSection";
import FooterSection from "../components/pages/section/FooterSection/FooterSection";

import LogoSection from "../components/pages/section/LogoSection/LogoSection";
import Products from "../components/pages/section/ProductSection/Products";
import Reviews from "../components/pages/section/ReviewSection/Reviews";

import TimerSection from "../components/pages/section/TimerSection/TimerSection";

const page = () => {
  // const { data } = getBanners();
  // console.log("banner data", data);
  return (
    <div>
      <LogoSection></LogoSection>
      <TimerSection></TimerSection>
      <Banner></Banner>
      <Reviews></Reviews>
      <Products></Products>
      <CartSection></CartSection>
      <FooterSection></FooterSection>
    </div>
  );
};

export default page;
