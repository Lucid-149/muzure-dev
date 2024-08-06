"use client";
import {
  countries,
  ICountry,
  getEmojiFlag,
  getCountryCode,
} from "countries-list";
import { Input } from "@nextui-org/input";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useState } from "react";

const AutocompleteInputCountry = ({
  label,
  onCountrySelect,
}: {
  label: string;
  onCountrySelect: (country: ICountry) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<ICountry[] | []>(
    []
  );

  // On input change filter the country
  const handleInput = (e: any) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    const filteredResults = Object.values(countries).filter(
      (country) =>
        country.name.toLowerCase().includes(value) ||
        country.native.toLowerCase().includes(value)
    );

    setFilteredCountries(filteredResults);
  };
  const handleCountrySelect = (country: ICountry) => {
    setInputValue(country.name);
    setFilteredCountries([]);
    onCountrySelect(country);
  };
  const getCode = (name: string) => {
    const code = getCountryCode(name);
    if (code) {
      return code;
    }
    return "KE";
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
      <ScrollShadow className=" absolute top-16 bg-background shadow-2xl rounded-2xl max-h-96 overflow-y-scroll z-50 w-full">
        {filteredCountries.map((result, i) => (
          <div
            className=" p-3 hover:bg-secondary/20 cursor-pointer"
            aria-label={result.name}
            key={i}
            onClick={() => handleCountrySelect(result)}
          >
            <p>
              {getEmojiFlag(getCode(result.name))} {result.name}
            </p>
          </div>
        ))}
      </ScrollShadow>
    </div>
  );
};

export default AutocompleteInputCountry;
