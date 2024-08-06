"use client";
import { useState, type FC, useMemo, useEffect } from "react";
import { Booking, Tour, TourPrices } from "@/types";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@nextui-org/input";
import z from "zod";
import clm from "country-locale-map";
import {
  Bed,
  Cable,
  Car,
  Check,
  ClipboardSignature,
  Compass,
  Fuel,
  Globe2,
  Link,
  Loader2,
  Mail,
  Phone,
  SunSnow,
  User2,
  Users,
  Utensils,
  WholeWord,
  Wifi,
} from "lucide-react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";

import { Slider } from "@nextui-org/slider";
import CustomDatePicker from "./elements/Date";
import Price from "../Plugins/Price";
import pb from "@/database";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const formSchema = z.object({
  clientName: z.string().min(2).max(50),
  clientEmail: z.string().email(),
  clientCountry: z.string(),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
  withAccommodation: z.boolean(),
  tourId: z.string(),
  withFood: z.boolean(),
  withCar: z.boolean(),
  travelDate: z.date(),
  accept: z.literal<boolean>(true, {
    invalid_type_error: "You must agree to the terms and conditions",
  }),
  numberOfPeople: z.number(),
});

interface BookingFromProps {
  tour: Tour;
  tour_rates: TourPrices[];
}
function calculatePrice(
  tour_rates: TourPrices[],
  residence: string,
  numberOfPeople: number
): number {
  // Extracting base price from the first element of the tour_rates array
  let basePricePerPersonSharing = tour_rates[0].Price_per_adult;
  let basePriceSingleRoom = tour_rates[0].Price_per_adult * 1.1;

  // Applying discounts based on residence
  const eastAfricanCountries = [
    "Tanzania",
    "Uganda",
    "Rwanda",
    "Burundi",
    "South Sudan",
    "Somalia"
  ];
  if (eastAfricanCountries.includes(residence)) {
    basePricePerPersonSharing *= 0.9; // 10% discount for East African residents
    basePriceSingleRoom *= 0.9; // 10% discount for East African residents
  } else if (residence === "Kenya") {
    basePricePerPersonSharing *= 0.85; // 15% discount for Kenyan residents
    basePriceSingleRoom *= 0.85; // 15% discount for Kenyan residents
  }

  // Calculate total price based on the selected options
  let totalPrice;
  if (numberOfPeople % 2 === 0) {
    // Even number of people
    totalPrice = basePricePerPersonSharing * (numberOfPeople / 2) + basePriceSingleRoom * (numberOfPeople / 2) * 1.07; // Adding 7% tax
  } else {
    // Odd number of people
    totalPrice = basePricePerPersonSharing * Math.floor(numberOfPeople / 2) + basePriceSingleRoom * Math.ceil(numberOfPeople / 2) * 1.07; // Adding 7% tax
  }

  return totalPrice / numberOfPeople;
}
const BookingFrom: FC<BookingFromProps> = ({ tour, tour_rates }) => {
  const c = clm.getAllCountries();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientCountry: "",
      phoneNumber: "",
      withAccommodation: true,
      tourId: tour.id,
      withFood: true,
      withCar: false,
      accept: false,
      travelDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      numberOfPeople: 1,
    },
  });

  const price = calculatePrice(
    tour_rates,
    form.watch("clientCountry"),
    form.watch("numberOfPeople"),
  );

  const onSubmit = async (data: any) => {
    const apiRequestPayload = {
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientCountry: data.clientCountry,
      phoneNumber: data.phoneNumber,
      withAccommodation: data.withAccommodation,
      tourId: data.tourId,
      withFood: data.withFood,
      withCar: data.withCar,
      travelDate: data.travelDate.toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      numberOfPeople: data.numberOfPeople,
      PaymentDue: price,
    };

    try {
      // Send email with tour booking details
      const emailResponse = await fetch("/api/send-email/tour-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestPayload),
      });

      if (!emailResponse.ok) {
        throw new Error(`HTTP error! Status: ${emailResponse.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      form.reset();
    }
  };

  if (form.formState.isSubmitted) {
    return (
      <div className="flex flex-col items-center my-auto justify-centergap-10 p-10 ">
        <p className="text-2xl font-black text-focus">
          Successfully Submited your booking
        </p>
        <Check size={100} />
        <p>Please check your email for a confrimation.</p>
      </div>
    );
  }

  return form.formState.isSubmitting ? (
    <div className="flex flex-col items-center justify-center gap-10 p-10 ">
      <p>Submitting your booking</p>{" "}
      <Loader2 size={100} className=" animate-spinner-ease-spin" />{" "}
      <p>Please, do not leave this page.</p>
    </div>
  ) : (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className=" px-8 flex flex-wrap w-full min-h-[600px] gap-1 py-20 justify-start items-start"
    >
      <span className="w-full text-xl">
        Please fill in the information below
      </span>
      <small></small>
      <div className="flex flex-wrap items-end justify-between w-full">
        <div className="w-full max-w-md mt-2 min-w-xs ">
          <Input
            variant={"underlined"}
            className=""
            classNames={{
              input: "sm:text-base text-base rounded-md",
              label: " sm:mb-6",
            }}
            startContent={<User2 />}
            label="Your Name"
            {...form.register("clientName")}
          />
          {form.formState.errors.clientName ? <p>{}</p> : null}
        </div>

        <div className="w-full max-w-md mt-2 min-w-xs ">
          <Input
            variant={"underlined"}
            label="Your Email"
            className="text-base "
            classNames={{
              input: "sm:text-base text-base rounded-md",
              label: " sm:mb-6 ",
            }}
            startContent={<Mail />}
            {...form.register("clientEmail")}
          />
          {form.formState.errors.clientEmail ? <p>{}</p> : null}
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-between w-full ">
        <div className="flex flex-col items-center justify-between w-full max-w-md gap-4 min-w-xs">
          <Input
            variant={"underlined"}
            label="Your Phone Number"
            className="w-full text-base "
            classNames={{
              input: "sm:text-base text-base rounded-md",
              label: " sm:mb-6",
            }}
            startContent={<Phone />}
            {...form.register("phoneNumber")}
          />
        </div>
        <div className="relative flex z-20 items-center justify-between w-full max-w-md gap-4 mt-2 min-w-xs ">
          <Controller
            control={form.control}
            name="travelDate"
            render={({ field }) => (
              <div className="flex flex-col w-full">
                <small className="text-xs ">Your travel date</small>
                <CustomDatePicker field={field} />
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between w-full pt-5">
        <Select
          className=" max-w-md"
          classNames={{
            listboxWrapper: "bg-background",
            listbox: "bg-background",
            popoverContent: "bg-background",
          }}
          label="Country of residence"
          variant={"underlined"}
          {...form.register("clientCountry")}
        >
          {c.map((c, i) => (
            <SelectItem startContent={c.emoji} key={c.name} value={c.name}>
              {c.name}
            </SelectItem>
          ))}
        </Select>
        <Controller
          control={form.control}
          name="numberOfPeople"
          render={({ field }) => (
            <Slider
              startContent={<Users />}
              label="Number of travellers"
              defaultValue={1}
              minValue={1}
              value={field.value}
              onChange={field.onChange}
              size="sm"
              color={"foreground"}
              maxValue={tour.Max_Travellers}
              classNames={{
                base: " bg-transparent min-w-xs mx-auto w-full max-w-md gap-3",
                track: " bg-transparent",
                filler: "bg-gradient-to-r from-forground to-background",
                value: "text-4xl font-black",
                label: "text-xs",
              }}
              renderThumb={(props) => (
                <div
                  {...props}
                  className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                </div>
              )}
            />
          )}
        />

        <div className="relative flex flex-wrap justify-start max-w-lg w-full gap-3 py-20 mx-auto mt-2 flex-warp">
        
        </div>
        <div className=" ml-auto flex flex-col items-start gap-2">
          <Price  price={price} />
        </div>
        <div className=" w-full">
          <strong>Price Inclusive of:</strong>
          <ul className=" ml-4 text-sm">
            <li>Accomodation at our selected partners</li>
            <li>Transport from/to the airport</li>
            <li>Transfers</li>
            <li>Park entry fees</li>
            <li>Associated Meals & Beverages</li>
            <li>Tour guide as needed</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between w-full gap-4 py-6">
        <Controller
          control={form.control}
          name="accept"
          render={({ field }) => (
            <Switch
              isDisabled={
                form.watch("clientName") && form.watch("clientEmail")
                  ? false
                  : true
              }
              isSelected={field.value}
              onChange={field.onChange}
              value={field.name}
            
            >
              <div className="flex items-center justify-between gap-4">
                <ClipboardSignature size={40} />
                <div className="flex flex-col ">
                  <p className="text-xl font-semibold">Accept & Book</p>
                  <p className="text-sm ">
                    I {form.watch("clientName")} agree to the{" "}
                    <a
                      href="/about/terms"
                      className=" text-foreground hover:text-focus"
                    >
                      terms & conditions
                    </a>{" "}
                    and book {tour.Name} for,{" "}
                    {form.watch("travelDate").toLocaleDateString("en-GB", {
                      dateStyle: "full",
                    })}
                  </p>
                </div>
              </div>
            </Switch>
          )}
        />
        <Button
          isDisabled={!form.watch("accept")}
          startContent={<Check />}
          type="submit"
          color={"secondary"}
          size={"lg"}
          className="w-full h-24 max-w-md ml-auto font-semibold text-white uppercase"
        >
          Complete
        </Button>
      </div>
    </form>
  );
};

export default BookingFrom;
