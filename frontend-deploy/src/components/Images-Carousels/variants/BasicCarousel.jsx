// frontend/src/components/Images-Carousels/variants/BasicCarousel.jsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BasicCarousel({ images, title }) {
  if (!images || images.length === 0) {
    return <p>No images for {title}</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        style={{
          height: "400px",
          /* borderRadius: "8px", */
          overflow: "hidden",
        }}
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
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
