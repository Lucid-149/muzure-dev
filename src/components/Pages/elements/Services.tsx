"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Car, Compass, Hotel, Map, MessageSquare, Plane } from "lucide-react";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import React from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
interface Service {
  name: string;
  description: string;
  icon: React.ReactNode;
  price?: number;
  callaction: React.ReactElement;
  image?: string;
}
const Services: Service[] = [
  {
    name: "Flight Booking",
    image: "images/1.jpg",
    description:
      "Our Flight Booking service provides a seamless experience for users seeking to effortlessly secure their air travel.",
    icon: (
      <Plane
        size={60}
        className="transition-all duration-300 ease-in-out group-hover:scale-110 scale-0"
      />
    ),

    price: 100,
    callaction: (
      <Button
        href="/services/flight-booking"
        as={Link}
        className="justify-center w-full p-5 mt-1 mb-10 max-w-xs"
        showAnchorIcon
        variant="flat"
      >
        Book a flight
      </Button>
    ),
  },
  {
    name: "Hotel Reservations",
    image: "images/2.jpg",

    description:
      "With our Hotel Reservations service, users can submit their accommodation preferences, including location, amenities, and budget constraints.",
    icon: (
      <Hotel
        size={60}
        className="transition-all duration-300 ease-in-out group-hover:scale-110 scale-0"
      />
    ),

    price: 150,
    callaction: (
      <Button
        href="/services"
        as={Link}
        className="justify-center w-full p-5 mt-1 mb-10 max-w-xs"
        showAnchorIcon
        variant="flat"
      >
        Book a hotel
      </Button>
    ),
  },
  {
    name: "Tour Packages",
    image: "images/3.jpg",

    description:
      "Our Tour Packages service caters to users seeking curated travel experiences.",
    icon: (
      <Map
        size={60}
        className="transition-all duration-300 ease-in-out group-hover:scale-110 scale-0"
      />
    ),

    callaction: (
      <Button
        href="/tours"
        as={Link}
        className="justify-center w-full p-5 mt-1 mb-10 max-w-xs"
        showAnchorIcon
        variant="flat"
      >
        Book a tour
      </Button>
    ),
  },
  {
    name: "Car Rentals",
    image: "images/4.jpg",

    description:
      "For those in need of reliable transportation, our Car Rentals service allows users to specify their car preferences, rental duration, and budget constraints.",
    icon: (
      <Car
        size={60}
        className="transition-all duration-300 ease-in-out group-hover:scale-110 scale-0"
      />
    ),

    price: 50,
    callaction: (
      <Button
        href="/services/car-rental"
        as={Link}
        className="justify-center w-full p-5 mt-1 mb-10 max-w-xs"
        showAnchorIcon
        variant="flat"
      >
        Rent a car
      </Button>
    ),
  },
  {
    name: "Guided Excursions",
    image: "images/5.jpg",

    description:
      "Experience the wonders of guided tours with our Guided Excursions service.",
    icon: (
      <Compass
        size={60}
        className="transition-all duration-300 ease-in-out group-hover:scale-110 scale-0"
      />
    ),

    price: 80,
    callaction: (
      <Button
        href="/tours"
        as={Link}
        className="justify-center w-full p-5 mt-1 mb-10 max-w-xs"
        showAnchorIcon
        variant="flat"
      >
        Book a guide
      </Button>
    ),
  },
];
interface ServicesProps {}

const ServicesComponent: React.FC<ServicesProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-4 py-24 mx-auto transition-all duration-300 h-fit bg-gradient-to-b  from-background to-transparent animate-appearance-in ease-soft-spring">
      <div className="flex flex-col items-center justify-center w-full gap-6 px-5">
        <h2 className="text-2xl font-black  uppercase">Our Services</h2>
        <span></span>
      </div>
      <ScrollShadow
        orientation="horizontal"
        className="flex p-10 w-full h-full gap-4 snap-mandatory snap-x overflow-x-scroll pb-24"
      >
        {Services.map((service, index) => (
          <Card
            key={index}
            className="relative max-w-xs min-w-fit snap-center rounded-md bg-background  overflow-hidden group transition-all duration-300  justify-center items-center flex"
          >
            <CardHeader className="flex relative justify-between flex-row items-start gap-2x w-full p-3">
              <Image
                src={`/${service.image}`}
                alt=""
                height={320}
                isBlurred
                width={320}
                className="-z-0 object-cover"
              />
              <div className=" absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center group-hover:bg-background/70">
                {service.icon}
              </div>
            </CardHeader>
            <CardBody className=" w-full max-w-md items-start">
              <h4 className="text-lg mt-4 w-full  uppercase transition-all ease-in-out  duration-400 ">
                {service.name}
              </h4>
              <p className=" transition-all ease-in-out max-w-xs text-sm">
                {service.description}
              </p>
            </CardBody>
            <CardFooter className=" justify-center">
              {service.callaction}
            </CardFooter>
          </Card>
        ))}
      </ScrollShadow>
    </div>
  );
};

export default ServicesComponent;
