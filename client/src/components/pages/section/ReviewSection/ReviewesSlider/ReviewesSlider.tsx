"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Removed Navigation
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { apiBaseUrl } from "@/src/config/config";

const ReviewesSlider = ({ reviews }) => {
  // const [images, setImages] = useState([]);

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const reviewLength = reviews?.data?.length || 0;

  console.log("for reviewLength", reviewLength);

  return reviewLength > 0 ? (
    <section className="lg:py-12 py-6 container relative">
      <div className="text-center flex items-center justify-center flex-col py-4">
        <h2 className="flex items-center justify-center lg:text-3xl md:text-2xl sm:text-xl text-lg font-semibold">
          আমাদের কাস্টমারের কিছু রিভিও
        </h2>
        <p className="lg:w-[60%] w-full py-2">
          Reading multiple reviews helps provide a well-rounded understanding of
          a product
        </p>
      </div>

      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute lg:top-1/2 top-2/4 lg:mt-10 md:mt-14 mt-20 xl:left-[9.5%] lg:left-[3%] md:left-[4%] left-4 px-2 py-2 border border-[#BE1E2D] text-[#BE1E2D] bg-white shadow-md rounded-full z-10"
        // onClick={() => swiperRef.current?.slidePrev()}
      >
        <IoIosArrowBack className="text-2xl" />
      </button>

      <button
        ref={nextRef}
        className="absolute lg:top-1/2 top-2/4 lg:mt-10 md:mt-14 mt-20 xl:right-[9.5%] lg:right-[3%] md:right-[4%] right-4  px-2 py-2 border border-[#BE1E2D] text-[#BE1E2D] bg-white shadow-md rounded-full z-10"
        // onClick={() => swiperRef.current?.slideNext()}
      >
        <IoIosArrowForward className="text-2xl" />
      </button>

      <Swiper
        modules={[Navigation]} // Removed Navigation
        spaceBetween={10}
        slidesPerView={4}
        autoplay={{ delay: 5000 }}
        loop={true}
        // onSwiper={(swiper) => (swiperRef.current = swiper)}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
        breakpoints={{
          200: { slidesPerView: 1 },
          300: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        // className="mySwiper"
      >
        {reviews?.data?.map((product, index) => (
          <SwiperSlide key={product._id} className="flex justify-center p-2">
            <div
              className="w-full lg:h-[400px] h-[500px] cursor-pointer relative group"
              onClick={() => {
                setCurrentIndex(index);
                setOpen(true);
              }}
            >
              <Image
                src={apiBaseUrl + product.photo}
                width={600}
                height={600}
                alt="Customer Review"
                className="w-full h-full object-cover border border-[#262626]/30 rounded relative"
              />

              <div className="top-[50%] left-[50%] absolute translate-x-[-50%] translate-y-[-50%] bg-[red] w-[60px] h-[60px] opacity-0 group-hover:opacity-[1] duration-300 scale-50 group-hover:scale-105 flex items-center justify-center border border-[#fff] font-semibold text-[#fff] rounded-full">
                <p>click</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={reviews?.data?.map((img) => ({ src: apiBaseUrl + img.photo }))}
        index={currentIndex}
      />
    </section>
  ) : null;
};

export default ReviewesSlider;
