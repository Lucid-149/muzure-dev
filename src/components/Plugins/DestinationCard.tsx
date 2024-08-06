import { Destination } from "@/types";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Info } from "lucide-react";
import { Image } from "@nextui-org/image";
import type { FC } from "react";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link
      className=" group mt-auto"
      href={`/destinations/${destination.id}`}
    >
    <Card
      className=" hover:shadow-2xl relative animate-appearance-in w-full max-w-[220px] aspect-[9/16] group bg-transparent border-secondary/80 group"
      title={destination.Name}
      aria-description={destination.Description}
    >
     
        <Image
          src={destination.Image}
          alt=""
          width={500}
          height={900}
          isZoomed
          isBlurred
          className=" object-cover aspect-[9/16] animate-appearance-in group-hover:blur-sm"
        />
        <h3 className="ease-in-out group-hover:h-1/2 h-1/5   right-1 left-1 bottom-3 leading-6 z-20 my-auto duration-500  text-lg transition-all [text-shadow:_0_3px_10px_rgb(0_0_0_/_60%)] text-white uppercase absolute">
          {destination.Name}
      
        </h3>
  
    </Card>
        </Link>
  );
};

export default DestinationCard;
