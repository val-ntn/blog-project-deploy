// frontend/src/components/Images-Carousels/variants/ThumbsCarousel.jsx

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";

export default function ThumbsCarousel({ images, title }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!images || images.length === 0) {
    return <p>No images for {title}</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      {/* Main Image */}
      <Swiper
        modules={[Thumbs, Navigation]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation
        loop
        spaceBetween={10}
        style={{ height: "400px", /* borderRadius: "8px", */ overflow: "hidden" }}
      >
        {images.map((url, index) => (
          <SwiperSlide key={`main-${index}`}>
            <img
              src={url}
              alt={`Main Slide ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 8 },
        }}
        style={{ marginTop: "1rem", height: "100px" }}
      >
        {images.map((url, index) => (
          <SwiperSlide key={`thumb-${index}`} style={{ cursor: "pointer" }}>
            <img
              src={url}
              alt={`Thumb ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
