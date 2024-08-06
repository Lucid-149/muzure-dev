import { Tour } from "@/types";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import type { FC } from "react";

interface TourCardProps {
  tour: Tour;
}

const TourCard: FC<TourCardProps> = ({ tour }) => {
  return (
    <Card
      aria-label={tour.Name}
      className=" p-2 w-full max-w-xs flex-grow animate-fade-up shadow-lg m-2 bg-background"
    >
      <CardHeader className=" flex-col items-start p-3 mt-2">
        <Image
          className=" object-cover aspect-square"
          src={tour.Image}
          isBlurred
          isZoomed
          height={500}
          width={500}
          sizes="400px"
          alt={tour.Name}
        />
      </CardHeader>
      <CardBody>
        <h2 className="font-black">{tour.Name}</h2>
        <p className=" text-xs font-medium line-clamp-6">{tour.Description}</p>
        <div>
        <div className=" font-bold">
          <span className=" text-xl">{tour.Duration_in_days}</span>{" "}
          <small className=" uppercase">Days</small>
        </div> 
        <span>
        
        </span>

        </div>
      </CardBody>
      <CardFooter className=" ">
        <Button
          as={Link}
          isExternal
          href={`/tours/${tour.id}`}
          className=" ml-auto bg-background font-bold hover:text-focus mt-auto"
        >
          See More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TourCard;
