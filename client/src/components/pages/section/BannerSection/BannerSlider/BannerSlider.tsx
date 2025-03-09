"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { apiBaseUrl } from "@/src/config/config";
import { TBanner } from "@/src/types";

const BannerSlider = ({ banners }: { banners: TBanner[] }) => {
  const swiperRef = useRef(null); // Reference to Swiper instance
  const bannerLength = banners?.data?.length || 0;

  return (
    <div className="container mt-8 relative">
      {/* Show navigation buttons only if there are more than 1 slide */}
      {bannerLength > 1 && (
        <>
          <button
            className="absolute lg:block hidden xl:top-[85%] lg:top-[85%] top-[20%] left-[80%] px-2 py-2 border border-[#BE1E2D] text-[#BE1E2D] bg-white shadow-md rounded z-10"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <IoIosArrowBack className="text-2xl" />
          </button>

          <button
            className="absolute lg:block hidden xl:top-[85%] lg:top-[85%] top-[20%] xl:right-[13%] lg:right-[8%] px-2 py-2 border border-[#BE1E2D] text-[#BE1E2D] bg-white shadow-md rounded z-10"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <IoIosArrowForward className="text-2xl" />
          </button>
        </>
      )}

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        loop
        className=""
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store Swiper instance
      >
        {bannerLength > 0 ? (
          banners?.data?.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="w-full lg:h-[550px] rounded">
                <Image
                  src={apiBaseUrl + banner.image}
                  alt="photo"
                  width={1000}
                  height={1000}
                  loading="lazy"
                  quality={80}
                  className="w-full h-full rounded"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-500">No images available</p>
        )}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
