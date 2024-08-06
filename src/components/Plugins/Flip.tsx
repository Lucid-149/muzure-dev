"use client";
import Image from "next/image";
import { useState, useEffect, FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllDestinationsMeta } from "@/database/func";

const Flip: FC = () => {
  const { data } = useQuery({
    queryKey: ["destinations"],
    queryFn: getAllDestinationsMeta,
  });
  const slides = data?.items;

  const [image, setImage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (slides) {
      if (slides.length <= image) return;

      const intervalId = setInterval(() => {
        setLoaded(false); // Reset loaded state before changing the image
        setImage((i) => (i + 1) % slides.length);
      }, 10000);

      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }
  }, [image, slides]);

  const handleImageLoad = () => {
    // 1 sec delay
    setTimeout(() => setLoaded(true), 2);
  };
  if (slides) {
    return (
      <div className=" h-screen relative">
        <Image
          className={`${
            loaded
              ? " animate-fade-left   animate-duration-[1000ms] animate-ease-in-out"
              : " -translate-x-full "
          }   object-cover z-0 transition-all ease-soft-spring duration-500`}
          fill
          sizes="(max-width: 768px) 1200px, (max-width: 1200px) 120vw, 100vw"
          alt="Muzure"
          src={slides[image].Image}
          onLoad={handleImageLoad}
        />
        {loaded ? (
          <h4
            className={
              " text-lg font-black z-30 w-full bg-gradient-to-t from-background to-transparent text-right p-5 items-end justify-end flex  text-foreground/20 absolute right-0 h-1/4 bottom-0 uppercase"
            }
          >
            {slides[image].Name},{slides[image].expand?.Country.Name}
          </h4>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className=" h-screen relative">
        <Image
          className={`${
            loaded
              ? " animate-fade-left   animate-duration-[1000ms] animate-ease-in-out"
              : " -translate-x-full "
          }   object-cover object-top z-0 transition-all ease-soft-spring duration-500`}
          fill
          sizes="100vw"
          alt="Muzure"
          src={"https://utfs.io/f/2fb8c32e-772e-4baf-af7f-4f2382ccd112-173epo.webp"}
        />
      </div>
    );
  }
};

export default Flip;
