"use client";
import Airports from "@/database/Airports.json";
import { Input } from "@nextui-org/input";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useState } from "react";
export type Airport = {
  name: string;
  iata_code: string;
  city: string;
  objectID: string;
  country: string;
};
const AutocompleteInput = ({
  label,
  onAirportSelect,
}: {
  label: string;
  onAirportSelect: (airport: Airport) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredAirports, setFilteredAirports] = useState<Airport[] | []>([]);

  const handleInput = (e: any) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    const filteredResults = Airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(value) ||
        airport.city.toLowerCase().includes(value) ||
        airport.country.toLowerCase().includes(value) ||
        airport.iata_code.toLowerCase().includes(value)
    );

    setFilteredAirports(filteredResults);
  };

  const handleAirportSelect = (airport: Airport) => {
    setInputValue(airport.name);
    setFilteredAirports([]);
    onAirportSelect(airport);
  };

  return (
    <div className=" relative w-full max-w-xs">
      <Input
        label={label}
        variant="underlined"
        type="text"
        value={inputValue}
        onChange={handleInput}
      />
      <ScrollShadow className=" shadow-2xl absolute top-16 bg-background rounded-2xl max-h-96 overflow-y-scroll z-50 w-full">
        {filteredAirports.map((result) => (
          <div
            className=" p-3 hover:bg-secondary/20 cursor-pointer"
            aria-label={result.name}
            key={result.objectID}
            onClick={() => handleAirportSelect(result)}
          >
            <p>{result.name}</p>
            <small className=" text-small">
              {result.city}, {result.country}
            </small>
          </div>
        ))}
      </ScrollShadow>
    </div>
  );
};

export default AutocompleteInput;
