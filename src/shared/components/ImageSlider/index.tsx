"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Mousewheel, Keyboard } from "swiper/modules";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImageSliderPropsT } from "./types";
import "swiper/css";

// Initialize Swiper modules
SwiperCore.use([Mousewheel, Keyboard]);

const ImageSlider = ({ images }: ImageSliderPropsT) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-full flex flex-col w-full gap-3 ">
      <div className="md:max-w-[600px] h-full ">
        <Swiper
          cssMode={true}
          mousewheel={true}
          keyboard={true}
          className="mySwiper h-full"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full max-h-64 min-h-64 sm:min-h-96 lg:min-h-56 rounded-xl object-fill">
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  fill
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center gap-2 ">
        {images.map((_, index) => (
          <div
            key={index}
            className={`rounded-full p-1 h-2 w-2 ${
              activeIndex === index ? "bg-purple" : "bg-purple-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
