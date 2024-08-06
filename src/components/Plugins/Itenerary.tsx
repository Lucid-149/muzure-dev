import { Itinerary } from "@/types";
import { Card } from "@nextui-org/card";
import { Map, MapPin } from "lucide-react";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import type { FC } from "react";
import Image from "next/image";

interface ItineraryProps {
  itenerary: Itinerary;
}
interface Day {
  stop: string;
  activity: string;
  transport: string[]; // Assuming the transportation modes are strings
}

const ItineraryComponent: FC<ItineraryProps> = ({ itenerary }) => {
  const days: Day[] = itenerary.Days as Day[];
  return (
    <div className=" flex flex-col justify-center items-start w-full pt-10">
      <div className=" w-full max-w-5xl drop-shadow-xl  relative pb-5">
        <Image src={'/images/footer.png'} className="object-contain -z-10 object-bottom" alt=""fill sizes="1200px" />
        <p className=" text-xs font-medium uppercase"> 
          This Itinerary covers approximately 
        </p>
          <span className=" font-black text-4xl">
          {itenerary.Total_Distance_KM.toLocaleString()}<small className="text-base">KM</small>
          </span>
          <p>
            {(itenerary.Total_Distance_KM * 0.6).toLocaleString()} Miles
          </p>
      <MapPin className=" -right-8  bottom-0 absolute animate-bounce" size={60}/>
      </div>
      <ScrollShadow orientation={"horizontal"} className=" snap-x snap-mandatory grid grid-flow-col w-full overflow-x-scroll p-10 gap-6">
        {days.map((day, index) => (
          <Card className=" snap-center aspect-video w-72 max-w-full  bg-background" key={index}>
            <div className=" p-1 flex border-foreground/10 justify-between items-end border-b px-4">
              <h3 className=" font-black text-xl flex flex-col justify-center items-center opacity-25">
                <small className=" text-sm">DAY</small> {index + 1}
              </h3>
              <span className=" w-1/2 ml-auto mb-2 text-sm uppercase text-right font-bold">{day.stop}</span>
              <MapPin className=" -mb-1 border-b text-foreground/30 border-foreground/30"/>
              
            </div>
            <div className="p-2">

            <p className=" text-xs">{day.transport.join(", ")}.</p>
            <p className=" text-small font-medium">{day.activity}</p>
            </div>
          </Card>
        ))}
      </ScrollShadow>
    </div>
  );
};

export default ItineraryComponent;
