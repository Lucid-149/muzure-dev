import Airlines from "@/database/Airlines.json";
import Image from "next/image";

import type { FC } from "react";

const AirlinesList: FC = () => {
  return (
    <div className="billboard-container w-full grid grid-flow-col ">
      <div className="billboard-content">
        {Airlines.map((a) => (
          <div
            className=" w-12 flex justify-center items-center gap-2"
            key={a.id}
          >
            <Image
              src={a.logo}
              width={30}
              height={30}
              className=" rounded-full object-contain"
              alt={a.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirlinesList;
