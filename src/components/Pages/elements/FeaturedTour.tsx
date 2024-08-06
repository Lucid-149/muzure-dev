import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import React from "react";

type TourProps = {
  tourTitle: string;
  tourDescription: string;
  itinerary: Array<{ day: number; activities: string; image?: string }>;
  pricing: {
    individualBudget: number;
    individualLuxury: number;
    groupBudget: number;
    groupLuxury: number;
    groupSize: number;
  };
  optionalActivities: Array<{ name: string; cost: number }>;
};

const FeaturedTour: React.FC<TourProps> = ({
  tourTitle,
  tourDescription,
  itinerary,
  pricing,
  optionalActivities,
}) => {
  const calculateGroupCostPerPerson = (
    totalCost: number,
    groupSize: number
  ) => {
    return (totalCost / groupSize).toFixed(2);
  };

  return (
    <div className=" bg-background/90 w-screen p-[5vw] z-20 pt-20 h-screen">
      <h1 className=" text-xl font-black uppercase">{tourTitle}</h1>
      <p className=" text-lg font-light">{tourDescription}</p>
      <div className=" flex flex-wrap justify-between items-start h-full">

      <ScrollShadow
        className=" grid grid-flow-row overflow-y-scroll overflow-x-hidden gap-4 p-4 h-full w-fit"
      >
        {itinerary.map((item) => (
          <div key={item.day}>
            <Card className=" bg-background/90 backdrop-blur-lg  w-96 group">
              {item.image ? (
                <Image src={item.image} alt={item.activities} isZoomed />
              ) : null}
              <CardHeader className=" flex-col items-start">
                <strong className=" font-black text-lg uppercase">
                  Day {item.day}
                </strong>
              </CardHeader>
              <CardBody className=" hidden group-hover:flex animate-appearance-in ">
                {item.activities}
              </CardBody>
            </Card>
          </div>
        ))}
      </ScrollShadow>
      <div>

      <h2>Pricing</h2>
      <p>
        <strong>Individual Private Budget Option:</strong> $
        {pricing.individualBudget.toFixed(2)} per person
      </p>
      <p>
        <strong>Individual Private Luxury Option:</strong> $
        {pricing.individualLuxury.toFixed(2)} per person
      </p>
      <p>
        <strong>Group Budget Option:</strong> ${pricing.groupBudget.toFixed(2)}{" "}
        total ( $
        {calculateGroupCostPerPerson(pricing.groupBudget, pricing.groupSize)}{" "}
        per person for a group of {pricing.groupSize})
      </p>
      <p>
        <strong>Group Luxury Option:</strong> ${pricing.groupLuxury.toFixed(2)}{" "}
        total ( $
        {calculateGroupCostPerPerson(pricing.groupLuxury, pricing.groupSize)}{" "}
        per person for a group of {pricing.groupSize})
      </p>

      <h2>Optional Activities</h2>
      <ul>
        {optionalActivities.map((activity) => (
          <li key={activity.name}>
            <strong>{activity.name}:</strong> ${activity.cost.toFixed(2)} per
            person
          </li>
        ))}
      </ul>
      </div>
      </div>
    </div>
  );
};

export default FeaturedTour;
