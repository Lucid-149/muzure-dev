"use client";
import { useState, FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Switch } from "@nextui-org/switch";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Slider } from "@nextui-org/slider";
import Image from "next/image";
import {
  Baby,
  Check,
  ChevronLeft,
  ChevronRight,
  Contact,
  Languages,
  Luggage,
  Plane,
  PlaneLanding,
  PlaneTakeoffIcon,
  Send,
  Users,
} from "lucide-react";
import AutocompleteInput, {
  Airport,
} from "./elements/AutoCompleteInputAirports";
import { PlaneTakeoff } from "lucide-react"; // Import your flight icon component
import { z } from "zod";
import { DatePicker } from "@adobe/react-spectrum";

import { RadioGroup, Radio } from "@nextui-org/radio";
import { Select, SelectItem } from "@nextui-org/select";
import CustomDatePicker from "./elements/Date";
import { ICountry } from "countries-list";
import AutocompleteInputCountry from "./elements/AutoCompleteCountry";

type BookingStages = "User Info" | "Destinations" | "Seating" | "Complete";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

interface FlightBookingFormProps {}
const formSchema = z.object({
  clientName: z.string().min(2).max(50),
  clientEmail: z.string().email(),
  clientCountry: z.string(),
  preferWindowSeat: z.boolean(),
  numberOfclients: z.number().int().positive(),
  numberOfChildren: z.number(),
  contactNumber: z.string(),
  flighDetails: z.object({
    departureCity: z.string(),
    arrivalCity: z.string(),
    return: z.boolean(),
    travelInsurance: z.boolean(),
    checkInLuggage: z.boolean(),
    dates: z.object({
      departureDate: z.date(),
      returnDate: z.date(),
    }),
    class: z.string(),
  }),
});

const FlightBookingForm: FC<FlightBookingFormProps> = () => {
  const [preferWindowSeat, setPreferWindowSeat] = useState(false);
  const [returnTicket, setReturnTicket] = useState(false);
  const [stage, setStage] = useState<BookingStages>("User Info");
  const [departureAirport, setDepartureAirport] = useState<Airport | null>(
    null
  );
  const [country, setCoutry] = useState<ICountry | null>(null);
  const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      clientName: "",
      clientEmail: "",
      contactNumber: "",
      clientCountry: "",
      numberOfclients: 1,
      numberOfChildren: 0,
      flighDetails: {
        departureCity: "",
        
      },
    },
  });

  function onSubmit() {
    // Handle form submission logic
  }

  return (
    <form
      className="bg-background/50 pb-20  rounded-3xl shadow-2xl mt-10 relative mx-auto flex flex-wrap gap-3 max-w-3xl justify-center items-center"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="p-5 w-full ">
        <h3 className=" font-bold ">Flight Booking Form</h3>
        <p>Please fill out the following information to book your flight.</p>
        <small>Bookings will be confirmed via email</small>
      </div>
      {stage === "User Info" ? (
        <div className=" animate-fade-left p-5 flex flex-wrap justify-evenly items-center gap-3 w-full  ">
          <strong className=" w-full">Your contact details</strong>
          <Input
            variant="underlined"
            className="max-w-xs"
            label="Name"
            {...form.register("clientName")}
            // Add other input properties as needed
          />
          {/* Display form errors if any */}
          {form.formState.errors.clientName && (
            <p>{form.formState.errors.clientName.message}</p>
          )}
          <Input
            variant="underlined"
            className="max-w-xs"
            label="Email"
            {...form.register("clientEmail")}
            // Add other input properties as needed
          />
          {/* Display form errors if any */}
          {form.formState.errors.clientEmail && (
            <p>{form.formState.errors.clientEmail.message}</p>
          )}
          <Input
            variant="underlined"
            className="max-w-xs"
            label="Phone Number"
            {...form.register("contactNumber")}
            // Add other input properties as needed
          />
          {/* Display form errors if any */}
          {form.formState.errors.contactNumber && (
            <p>{form.formState.errors.contactNumber.message}</p>
          )}
          <AutocompleteInputCountry
            label="Country"
            onCountrySelect={setCoutry}
          />
          <Button
            endContent={<ChevronRight />}
            onClick={() => setStage("Destinations")}
            variant="light"
            isDisabled={
              form.watch("clientName").length < 1 ||
              form.watch("clientEmail").length < 1 ||
              form.watch("contactNumber").length < 1
            }
            className=" uppercase font-bold  ml-auto"
          >
            Continue to Flight Details
          </Button>
        </div>
      ) : null}
      {stage === "Destinations" ? (
        <div className=" animate-fade-left flex flex-wrap gap-3 w-full p-5  justify-evenly items-center">
          <strong className=" w-full">Your flight details</strong>
          <AutocompleteInput
            label="From"
            onAirportSelect={setDepartureAirport}
          />
          <AutocompleteInput label="To" onAirportSelect={setArrivalAirport} />
          <Controller
            control={form.control}
            name="numberOfclients"
            render={({ field }) => (
              <Slider
                startContent={<Users />}
                label="Number of adults"
                defaultValue={1}
                minValue={1}
                value={field.value}
                onChange={field.onChange}
                size="sm"
                color={"foreground"}
                maxValue={8}
                classNames={{
                  base: " bg-transparent  mx-auto w-full max-w-xs gap-3",
                  track: " bg-transparent",
                  filler: "bg-gradient-to-r from-forground to-background",
                  value: "text-4xl font-black",
                  label: "text-xs",
                }}
                renderThumb={(props) => (
                  <div
                    {...props}
                    className="group p-1 bg-background top-1/2  border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  >
                    <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                  </div>
                )}
              />
            )}
          />
          <Controller
            control={form.control}
            name="numberOfChildren"
            render={({ field }) => (
              <Slider
                startContent={<Baby />}
                label="Number of Childern"
                defaultValue={0}
                minValue={0}
                value={field.value}
                onChange={field.onChange}
                size="sm"
                color={"foreground"}
                maxValue={8}
                classNames={{
                  base: " bg-transparent mx-auto w-full max-w-xs gap-3",
                  track: " bg-transparent",
                  filler: "bg-gradient-to-r from-forground to-background",
                  value: "text-4xl font-black",
                  label: "text-xs",
                }}
                renderThumb={(props) => (
                  <div
                    {...props}
                    className="group p-1 bg-background top-1/2  border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  >
                    <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                  </div>
                )}
              />
            )}
          />
          <ButtonGroup className=" w-full max-w-xs uppercase " variant="flat">
            <Button
              className="uppercase font-extrabold"
              color={returnTicket ? "default" : "success"}
              onClick={() => setReturnTicket(false)}
            >
              One Way
            </Button>
            <Button
              className="uppercase font-extrabold"
              color={returnTicket ? "success" : "default"}
              onClick={() => setReturnTicket(true)}
            >
              Return
            </Button>
          </ButtonGroup>

          <Controller
            control={form.control}
            name="flighDetails.dates.departureDate"
            render={({ field }) => (
              <div className="flex flex-col w-full z-20 max-w-xs">
                <small className="text-xs ">Departure date</small>
                <CustomDatePicker field={field} />
              </div>
            )}
          />
          {returnTicket ? (
            <Controller
              control={form.control}
              name="flighDetails.dates.returnDate"
              render={({ field }) => (
                <div className="flex flex-col w-full z-20 max-w-xs">
                  <small className="text-xs ">Return date</small>
                  <CustomDatePicker field={field} />
                </div>
              )}
            />
          ) : null}
          <div className=" w-full flex justify-between items-center">
            <Button
              startContent={<ChevronLeft />}
              onClick={() => setStage("User Info")}
              variant="light"
              className=" uppercase font-bold "
            >
              Back to Contact Information
            </Button>
            <Button
              endContent={<ChevronRight />}
              onClick={() => setStage("Seating")}
              variant="light"
              isDisabled={departureAirport === null || arrivalAirport === null}
              className=" uppercase font-bold"
            >
              Flight Preferences
            </Button>
          </div>
        </div>
      ) : null}
      {stage === "Seating" ? (
        <div className=" flex flex-wrap gap-3 p-5 w-full  justify-evenly items-center animate-fade-left">
          <strong className=" w-full">Your flight preferences</strong>

          <Controller
            control={form.control}
            name="preferWindowSeat"
            render={({ field }) => (
              <Switch
                isSelected={field.value}
                onChange={() => field.onChange(!field.value)}
              
              >
                <div className="flex justify-between items-center gap-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11.47 13.91H8.08l-1-5.67a2.35 2.35 0 00-2.32-2A2.35 2.35 0 002.49 9l1.45 8.72h7.64a1.91 1.91 0 001.88-2.23 2 2 0 00-1.99-1.58z"
                      className=" fill-none stroke-current"
                      stroke="1"
                    ></path>
                    <path
                      d="M0.55 22.5L23.45 22.5"
                      className=" fill-none stroke-current"
                      stroke="1"
                    ></path>
                    <path
                      d="M8.18 17.73L8.18 22.5"
                      className=" fill-none stroke-current"
                      stroke="1"
                    ></path>
                    <rect
                      width="7.64"
                      height="11.45"
                      x="13.91"
                      y="1.5"
                      className=" fill-none stroke-current"
                      stroke="1"
                      rx="3.82"
                    ></rect>
                    <path
                      d="M13.91 5.32L21.55 5.32"
                      className=" fill-none stroke-current"
                      stroke="1"
                    ></path>
                  </svg>
                  <div className=" w-2/3">
                    <p className="text-sm uppercase font-medium">Window seat</p>
                    <p className="text-tiny text-default-400">
                      Get a window seat for an extra $50 per person.
                    </p>
                  </div>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={form.control}
            name="flighDetails.checkInLuggage"
            render={({ field }) => (
              <Switch
                isSelected={field.value}
                onChange={() => field.onChange(!field.value)}
             
              >
                <div className="flex justify-between items-center gap-1">
                  <Luggage size={80} />
                  <div className=" w-4/5">
                    <p className="text-sm uppercase font-medium">
                      Check in Luggage
                    </p>
                    <p className="text-tiny text-default-400">
                      Check your luggage at the airport. Additional fees may
                      apply.
                    </p>
                  </div>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={form.control}
            name="flighDetails.travelInsurance"
            render={({ field }) => (
              <Switch
                isSelected={field.value}
                onChange={() => field.onChange(!field.value)}
              
              >
                <div className="flex justify-between items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    fill="currentColor"
                    version="1.1"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                  >
                    <path d="M105.955 249.339l121.285-21.611 5.869 68.518-33.372 19.627a13.25 13.25 0 00-6.405 9.583l-1.55 11.063c-.444 3.171 2.408 5.813 5.536 5.127l39.606-8.681c.34 1.105.728 2.197 1.223 3.247 2.412 5.119 7.409 11.253 16.876 11.31l.13.002c9.467-.059 14.465-6.192 16.877-11.312.494-1.05.882-2.142 1.223-3.247l39.606 8.681c3.128.686 5.979-1.956 5.535-5.127l-1.55-11.063a13.253 13.253 0 00-6.405-9.583l-33.372-19.627 5.868-68.518 121.285 21.611c4.552.88 8.741-2.454 8.261-6.575l-2.494-21.449c-.602-5.177-4.131-9.725-9.36-12.061l-111.819-50.096 4.385-51.199c3.049-23.45-1.553-38.46-8.498-48.063-14.79-20.452-44.556-20.449-59.287.044-6.904 9.605-11.469 24.605-8.425 48.019l4.385 51.199-111.818 50.096c-5.229 2.336-8.759 6.883-9.361 12.061l-2.495 21.449c-.48 4.122 3.708 7.455 8.261 6.575zM233.621 82.018c0-11.655 9.448-21.103 21.103-21.103 11.655 0 21.103 9.448 21.103 21.103v3.613a3.952 3.952 0 01-3.951 3.952h-34.302a3.953 3.953 0 01-3.953-3.952v-3.613zM75.108 387.693a28.05 28.05 0 0017.178 24.139l53.19 22.237a13.021 13.021 0 017.798 11.928v21.438h80.708l-5.697-33.187a49.152 49.152 0 00-36.478-39.358l-20.792-5.22-12.201-34.404a11.061 11.061 0 00-21.486 3.684l-.024 22.256-24.745-6.211a8.617 8.617 0 01-6.325-6.544L94.42 313.576a12.006 12.006 0 00-11.737-9.479c-6.924 0-12.413 5.841-11.983 12.752l4.408 70.844zM399.439 374.996l-24.744 6.211-.024-22.256a11.06 11.06 0 00-21.486-3.684l-12.201 34.404-20.792 5.22a49.154 49.154 0 00-36.477 39.358l-5.697 33.187h80.707v-21.438c0-5.172 3.062-9.854 7.799-11.928l53.19-22.237a28.055 28.055 0 0017.179-24.139l4.406-70.844c.43-6.911-5.06-12.752-11.983-12.752a12.006 12.006 0 00-11.737 9.479l-11.813 54.875a8.621 8.621 0 01-6.327 6.544z"></path>
                  </svg>
                  <div className=" w-4/5">
                    <p className="text-sm uppercase font-medium">
                      Travel Insurance
                    </p>
                    <p className="text-tiny text-default-400">
                      Get compensated if your flight gets canceled or delayed
                      due to airline fault, weather conditions Additional cost
                      of $100 per person.
                    </p>
                  </div>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={form.control}
            name="flighDetails.class"
            render={({ field }) => (
              <RadioGroup
                description="Based on avalibility "
                {...field}
                className=" w-full max-w-xs"
              >
                <Radio
                  color="secondary"
                
                  value="Economy"
                >
                  Economy class
                </Radio>

                <Radio
                  color="secondary"
                
                  value="First"
                >
                  First class
                </Radio>
              </RadioGroup>
            )}
          />
          <div className=" w-full flex justify-between items-center">
            <Button
              startContent={<ChevronLeft />}
              onClick={() => setStage("Destinations")}
              variant="light"
              className=" uppercase font-bold "
            >
              Back to Flight Details
            </Button>
            <Button
              endContent={<ChevronRight />}
              onClick={() => setStage("Complete")}
              variant="light"
              className=" uppercase font-bold"
            >
              Complete
            </Button>
          </div>
        </div>
      ) : null}
      {stage === "Complete" ? (
        <div className=" w-full animate-fade-left  p-2">
          <div className=" flex justify-evenly items-start flex-wrap gap-6">
            <div className=" flex flex-col border border-foreground/30 rounded-md">
              <p className=" font-bold flex items-center gap-3 p-2 bg-foreground/30 rounded-t-md">
                <Contact /> Contact Information
              </p>
              <span className=" text-sm px-2">{form.watch("clientName")}</span>
              <span className=" text-sm italic px-2">
                {form.watch("clientEmail")}
              </span>
              <span className=" text-sm px-2">
                {form.watch("contactNumber")}
              </span>
              <span className=" text-sm px-2">
                {country?.name}
              </span>
            </div>
            <div className=" flex flex-wrap max-w-sm justify-evenly items-center border rounded-md border-foreground/30">
              <p className=" font-bold flex items-center gap-3 p-2 w-full bg-foreground/30 rounded-t-md">
                <Plane /> Flight Information
              </p>
              <span className=" flex flex-col border-b p-5 border-foreground/20 w-full max-w-sm mr-auto">
                <small className=" font-medium">Departing from:</small>
                {departureAirport?.name}
                <small className=" font-medium">{departureAirport?.country}</small>
              </span>
              <span className=" flex flex-col border-b p-5 border-foreground/20 w-full max-w-sm mr-auto">
                <small className=" font-medium">Arriving at:</small>
                {arrivalAirport?.name}
                <small className=" font-medium">{arrivalAirport?.country}</small>
              </span>
              <div className=" w-full flex justify-start flex-wrap items-start">
                <span className=" text-sm w-full max-w-sm flex flex-col border-b p-5 border-foreground/20">
                  <small className=" font-medium">Party size:</small>
                  {form.watch("numberOfclients") > 1
                    ? `${form.watch("numberOfclients")} Adults`
                    : "1 Adult"}
                  {form.watch("numberOfChildren") > 0
                    ? form.watch("numberOfChildren") > 1
                      ? ` & ${form.watch("numberOfChildren")} Children `
                      : " & 1 Child"
                    : null}
                </span>
                <span className=" text-sm w-full max-w-sm flex flex-col border-b p-5 border-foreground/20">
                  <small className=" font-medium">Departing on:</small>
                  {form
                    .watch("flighDetails.dates.departureDate")
                    .toLocaleDateString("en-us", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                </span>
                {returnTicket ? (
                  <span className=" text-sm w-full max-w-sm flex flex-col border-b p-5 border-foreground/20">
                    <small>Returning on:</small>
                    {form
                      .watch("flighDetails.dates.returnDate")
                      .toLocaleDateString("en-us", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                  </span>
                ) : null}
              </div>
              <div className=" w-full p-4 flex justify-evenly items-center">
                {form.watch("preferWindowSeat") ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11.47 13.91H8.08l-1-5.67a2.35 2.35 0 00-2.32-2A2.35 2.35 0 002.49 9l1.45 8.72h7.64a1.91 1.91 0 001.88-2.23 2 2 0 00-1.99-1.58z"
                      className=" fill-none stroke-current"
                      stroke="1"
                    ></path>
                    <path
                      d="M0.55 22.5L23.45 22.5"
                      className=" fill-none stroke-current"
                      stroke="1"
                    ></path>
                    <path
                      d="M8.18 17.73L8.18 22.5"
                      className=" fill-none stroke-current"
                      stroke="1"
                    ></path>
                    <rect
                      width="7.64"
                      height="11.45"
                      x="13.91"
                      y="1.5"
                      className=" fill-none stroke-current"
                      stroke="1"
                      rx="3.82"
                    ></rect>
                    <path
                      d="M13.91 5.32L21.55 5.32"
                      className=" fill-none stroke-current"
                      stroke="1"
                    ></path>
                  </svg>
                ) : null}
                {form.watch("flighDetails.checkInLuggage") ? <Luggage /> : null}
                {form.watch("flighDetails.travelInsurance") ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    version="1.1"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                  >
                    <path d="M105.955 249.339l121.285-21.611 5.869 68.518-33.372 19.627a13.25 13.25 0 00-6.405 9.583l-1.55 11.063c-.444 3.171 2.408 5.813 5.536 5.127l39.606-8.681c.34 1.105.728 2.197 1.223 3.247 2.412 5.119 7.409 11.253 16.876 11.31l.13.002c9.467-.059 14.465-6.192 16.877-11.312.494-1.05.882-2.142 1.223-3.247l39.606 8.681c3.128.686 5.979-1.956 5.535-5.127l-1.55-11.063a13.253 13.253 0 00-6.405-9.583l-33.372-19.627 5.868-68.518 121.285 21.611c4.552.88 8.741-2.454 8.261-6.575l-2.494-21.449c-.602-5.177-4.131-9.725-9.36-12.061l-111.819-50.096 4.385-51.199c3.049-23.45-1.553-38.46-8.498-48.063-14.79-20.452-44.556-20.449-59.287.044-6.904 9.605-11.469 24.605-8.425 48.019l4.385 51.199-111.818 50.096c-5.229 2.336-8.759 6.883-9.361 12.061l-2.495 21.449c-.48 4.122 3.708 7.455 8.261 6.575zM233.621 82.018c0-11.655 9.448-21.103 21.103-21.103 11.655 0 21.103 9.448 21.103 21.103v3.613a3.952 3.952 0 01-3.951 3.952h-34.302a3.953 3.953 0 01-3.953-3.952v-3.613zM75.108 387.693a28.05 28.05 0 0017.178 24.139l53.19 22.237a13.021 13.021 0 017.798 11.928v21.438h80.708l-5.697-33.187a49.152 49.152 0 00-36.478-39.358l-20.792-5.22-12.201-34.404a11.061 11.061 0 00-21.486 3.684l-.024 22.256-24.745-6.211a8.617 8.617 0 01-6.325-6.544L94.42 313.576a12.006 12.006 0 00-11.737-9.479c-6.924 0-12.413 5.841-11.983 12.752l4.408 70.844zM399.439 374.996l-24.744 6.211-.024-22.256a11.06 11.06 0 00-21.486-3.684l-12.201 34.404-20.792 5.22a49.154 49.154 0 00-36.477 39.358l-5.697 33.187h80.707v-21.438c0-5.172 3.062-9.854 7.799-11.928l53.19-22.237a28.055 28.055 0 0017.179-24.139l4.406-70.844c.43-6.911-5.06-12.752-11.983-12.752a12.006 12.006 0 00-11.737 9.479l-11.813 54.875a8.621 8.621 0 01-6.327 6.544z"></path>
                  </svg>
                ) : null}
              </div>
            </div>
          </div>
          <div className=" w-full flex justify-evenly p-5 items-center flex-wrap">
            <Button
              startContent={<ChevronLeft />}
              onClick={() => setStage("Seating")}
              variant="light"
              className=" uppercase font-bold "
            >
              Back to Flight Preferences
            </Button>

            <Button
              startContent={<Send />}
              type="submit"
              variant="light"
              color="success"
              className=" uppercase font-black text-2xl"
              size="lg"
            >
              Book Flight
            </Button>
          </div>
        </div>
      ) : null}

      {/* Add any loading or success messages as needed */}
      {form.formState.isSubmitting && <p>Submitting your flight booking...</p>}
      {form.formState.isSubmitted && (
        <div>
          <Check size={24} />
          <p>Flight booked successfully!</p>
        </div>
      )}
    </form>
  );
};

export default FlightBookingForm;
