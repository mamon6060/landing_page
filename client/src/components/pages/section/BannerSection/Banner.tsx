import { getBanners } from "@/src/services/banners";
import React from "react";
import BannerSlider from "./BannerSlider/BannerSlider";

const Banner = async () => {
  const banners = await getBanners();
  console.log("banner data", banners);
  
  return (
    <div>
      <BannerSlider banners={banners}></BannerSlider>
    </div>
  );
};

export default Banner;
