//frontend/src/components/Images-Carousels/CarouselLivePreview.jsx

import React from "react";
import BasicCarousel from "./variants/BasicCarousel";
import ThumbsCarousel from "./variants/ThumbsCarousel";
import MultiRowCarousel from "./variants/MultiRowCarousel";

export default function CarouselLivePreview({ type, images }) {
  if (!images || images.length === 0) {
    return <p>No images selected for preview</p>;
  }

  const carouselData = {
    title: "Preview Carousel",
    images,
  };

  switch (type) {
    case "thumbs":
      return <ThumbsCarousel images={images} title="Preview Carousel" />;
    case "multi-row":
      return <MultiRowCarousel images={images} title="Preview Carousel" />;
    case "basic":
    default:
      return <BasicCarousel images={images} title="Preview Carousel" />;
  }
}
