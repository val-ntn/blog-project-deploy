// frontend/src/components/Images-Carousels/variants/MultiRowCarousel.jsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function MultiRowCarousel({ images, title }) {
  if (!images || images.length === 0) {
    return <p>No images for {title}</p>;
  }

  return (
    <div style={{width: "100%", maxWidth: "1000px", margin: "2rem auto" }}>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        breakpoints={{
          300: { slidesPerView: 1 },
          700: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1024:{ slidesPerView: 4 },
        }}
        loop={true}
        style={{ height: "240px" }}
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                /* borderRadius: "8px", */
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
