import React from "react";
import Image from "next/image";
import Price from "@/components/Plugins/Price";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

interface Package {
  name: string;
  price: number;
}

interface DestinationProps {
  name: string;
  packages: Package[];
}


const Destination: React.FC<DestinationProps> = ({ name, packages }) => {
  return (
    <Accordion className=" shadow-inner max-w-xs bg-background/30 w-full p-2 rounded-md" title={name}>
     
        {packages.map((packageInfo, packageIndex) => (
          <AccordionItem key={packageIndex}>
            <strong>{packageInfo.name} </strong> <Price price={packageInfo.price}/>
          </AccordionItem>
        ))}
        
    </Accordion>
  );
};

export default Destination;
