import type { FC } from "react";
import Flip from "../Plugins/Flip";
import { siteConfig } from "@/config/site";
//import Hero from "./elements/Hero";
//import Services from "./elements/Services";
//import Section from "./elements/Section";
//import Destination from "./elements/Destinations";
import dynamic from "next/dynamic";
import { GetData } from "@/classes/data";
import { Destination } from "@/types";
import pb from "@/database";
import DestinationCard from "../Plugins/DestinationCard";
import React from "react";
import { ListResult } from "pocketbase";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { MapPinned } from "lucide-react";
import BlogComponent from "./elements/Blog";

interface HomeProps {
  destinations: ListResult<Destination>;
}

const Hero = dynamic(() => import("./elements/Hero"));
const Services = dynamic(() => import("./elements/Services"));
const Section = dynamic(() => import("./elements/Section"));

const Home: FC<HomeProps> = ({ destinations }) => {
  const tour1 = [
    {
      name: "Mombasa",
      packages: [
        { name: "Self Catering", price: 250 },
        { name: "Full Board", price: 400 },
        { name: "All-Inclusive", price: 600 },
      ],
    },
    {
      name: "Kilifi",
      packages: [
        { name: "Self Catering", price: 275 },
        { name: "Full Board", price: 425 },
        { name: "All-Inclusive", price: 650 },
      ],
    },
    {
      name: "Diani",
      packages: [
        { name: "Self Catering", price: 300 },
        { name: "Full Board", price: 450 },
        { name: "All-Inclusive", price: 700 },
      ],
    },
  ];
  return (
    <ScrollShadow className=" flex flex-col w-full">
      <Hero />
      <Services />

      <div className=" w-full max-w-7xl p-5 mx-auto flex flex-col justify-center items-center text-center gap-4 mt-20">
        <h2 className=" w-full text-xl font-black  uppercase">
          Featured Destinations
        </h2>
        <p className=" w-full max-w-2xl text-base text-justify">
          With{" "}
          <span className=" text-xl font-black ">
            {destinations.totalItems.toLocaleString()}
          </span>{" "}
          destinations to visit each offers its own charm and unique
          experiences. From the stunning beaches of Mombasa to the tranquility
          of Kilifi Island, we have you covered with our carefully curated
          selection of destinations that will make your honeymoon truly
          unforgettable.
        </p>
        <Button
          as={Link}
          showAnchorIcon
          href="/destinations"
          variant="flat"
          startContent={<MapPinned />}
          size="lg"
        >
          View All Destinations
        </Button>
      </div>
      <div className=" p-[5vw] flex justify-center flex-wrap items-center gap-6 h-full w-full mb-20">
        {destinations.items.map((d) => (
          <React.Fragment key={d.id}>
            <DestinationCard destination={d} />
          </React.Fragment>
        ))}
      </div>
      <div className=" p-5 text-center flex flex-col justify-center items-center">

      <h2 className=" text-xl font-black">Muzure Travel Blog</h2>
      <p className=" text-lg">
        For latest news and travel infomation for planning your next tour to
        Africa
      </p>
      </div>

      <BlogComponent />
    </ScrollShadow>
  );
};

export default Home;
