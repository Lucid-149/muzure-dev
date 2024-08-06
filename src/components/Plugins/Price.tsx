"use client";
import { url } from "@/database";
import { Rate } from "@/types";
import type { FC } from "react";
import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import { DollarSign, EuroIcon, PoundSterling } from "lucide-react";
import { KEIcon } from "../Layout/icons";
import { useQuery } from "@tanstack/react-query";
import { useRates } from "@/hooks/useRate";
interface PriceProps {
  price: number;
  unit?:string;
}
function newFunction(rate: Rate, price: number) {
  return (
    <span className=" text-xl font-black flex justify-center items-center gap-1">
      <small className=" text-xs">{rate.Currency}</small>
      {new Intl.NumberFormat("en-GB", {
        //decimal
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price * rate.rate_to_usd)}
      <small className=" text-lg mt-auto">/=</small>
    </span>
  );
}

const Price: FC<PriceProps> = ({ price,unit }) => {
  const { data: rates } = useRates();

  const d = rates?.items.map((rate: Rate) => (
    <div className="" key={rate.id}>
      {newFunction(rate, price)}
    </div>
  ));
  function getRate(currency: string) {
    if (rates) {
      let rate = rates.items.find((item) => item.Currency === currency);

      return rate;
    }
    return null;
  }
  return (
    <Card className=" p-3 bg-transparent shadow-none flex flex-col items-start min-w-[180px]">
      {rates ? (
        <Tabs variant="light">
          <Tab key="usd" title="USD">
            {newFunction(getRate("USD")!, price)}
            <span className=" uppercase text-xs font-bold opacity-50">
              Per {unit ? unit: "Traveller"}
            </span>
          </Tab>
          <Tab key="eur" title="EUR">
            {newFunction(getRate("EUR")!, price)}
            <span className=" uppercase text-xs font-bold opacity-50">
              Per {unit ? unit: "Traveller"}
            </span>
          </Tab>
          <Tab key="gbp" title="GBP">
            {newFunction(getRate("GBP")!, price)}
              <span className=" uppercase text-xs font-bold opacity-50">
              Per {unit ? unit: "Traveller"}
            </span>
          </Tab>
          <Tab key="kes" title="KES">
            {newFunction(getRate("KES")!, price)}
              <span className=" uppercase text-xs font-bold opacity-50">
              Per {unit ? unit: "Traveller"}
            </span>
          </Tab>
        </Tabs>
      ) : null}
     
    </Card>
  );
};

export default Price;
