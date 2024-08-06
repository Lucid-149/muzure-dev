import { Country } from "@/types";
import Image from "next/image";
import { Link } from "@nextui-org/link";
import type { FC } from "react";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { ChevronRight } from "lucide-react";

interface CountryCardProps {
  county: Country;
}

const CountryCard: FC<CountryCardProps> = ({ county }) => {
  return (
    <Card
      className="group w-full min-w-72 relative"
    >
      <Image
        src={county.Image}
        alt={`${county.Name}  flag`}
        fill
        sizes="400px"
        loading="lazy"
        className=" rounded-md  object-top object-cover "
      />
      <div className=" text-foreground  z-30 left-0 p-2 text-center hover:bg-background/50 transition flex items-center justify-between w-full h-full mx-auto my-auto">
      
        <h4 className=" transition uppercase text-lg font-black [text-shadow:_0_3px_10px_rgb(0_0_0_/_60%)] ">{county.Name}</h4>
        <Button  as={Link} isIconOnly     href={`/destinations/c/${county.Name}`}
        >
          <ChevronRight/>
        </Button>
      </div>
    </Card>
  );
};

export default CountryCard;
