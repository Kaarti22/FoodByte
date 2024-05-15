  "use client";

  import React from "react";
  import { useEffect } from "react";
  import { useState } from "react";

  const Carousel = ({ images = [] }) => {
    const [activeImg, setactiveImg] = useState(0);
    
    useEffect(() => {
      setTimeout(() => {
        if (activeImg >= 3) {
          setactiveImg(0);
        } else {
          setactiveImg(activeImg + 1);
        }
      }, 2000);
    }, [activeImg]);
    
    return (
      <div
        id="default-carousel"
        className="relative w-full h-full"
        data-carousel="static"
      >
        <div className="relative h-full overflow-hidden rounded-3xl">
          {images.map((image, i) => (
            <div
              className={`duration-700 ease-in-out absolute inset-0 transition-all transform  -z-50  ${
                i === activeImg
                  ? "translate-x-0"
                  : i < activeImg
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
              key={i}
            >
              <img
                src={image}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-90"
                alt="carousel"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default Carousel;