import type { FC } from "react";
import { Cars } from "@/database/cars";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Price from "./Price";
import { Button } from "@nextui-org/button";
import MainModal from "./MainModal";
import CarBookingForm from "../forms/CarRentalForm";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

const CarsComponent: FC = () => {
  return (
    <ScrollShadow orientation="horizontal" className="flex p-10 w-full h-full gap-4 snap-mandatory snap-x overflow-x-scroll pb-24">
      {Cars.map((c) => (
        <Card
          className=" min-w-fit bg-background max-w-xs"
          key={c.id}
        >
          <CardHeader className=" max-w-sm flex justify-center flex-wrap items-center">
            <Image
              className=""
              src={c.image}
              width={320}
              height={320}
              alt="Car"
            />
            <h4 className=" uppercase text-center font-black">{c.name}</h4>
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between">
              <Price unit="Day" price={c.pricePerDay} />
              <div className=" flex flex-col items-center bg-secondary/10 p-2 rounded-md sha aspect-square  text-3xl justify-center ">
                <span className=" text-sm font-bold uppercase">Seats</span>
                {c.capacity}
              </div>
            </div>
            <p className=" text-sm max-w-xs">{c.description}</p>
            <strong>Features</strong>
            <ul className=" text-xs">
              {c.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </CardBody>
          <CardFooter className=" justify-center">
            <MainModal action="Rent">
              <CarBookingForm car={c} />
            </MainModal>
          </CardFooter>
        </Card>
      ))}
    </ScrollShadow>
  );
};

export default CarsComponent;
