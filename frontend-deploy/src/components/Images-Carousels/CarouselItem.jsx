// frontend/src/components/Images-Carousels/CarouselItem.jsx

import React from "react";
import BasicCarousel from "./variants/BasicCarousel";
import ThumbsCarousel from "./variants/ThumbsCarousel";
import MultiRowCarousel from "./variants/MultiRowCarousel";

export default function CarouselItem({ carousel }) {
  const { title, images, type = "basic" } = carousel;

  if (!images || images.length === 0) {
    return <p>No images for {title}</p>;
  }

  switch (type) {
    case "thumbs":
      return <ThumbsCarousel images={images} title={title} />;
    case "multi-row":
      return <MultiRowCarousel images={images} title={title} />;
    case "basic":
    default:
      return <BasicCarousel images={images} title={title} />;
  }
}
