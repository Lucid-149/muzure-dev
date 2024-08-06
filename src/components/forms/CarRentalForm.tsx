"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useForm, Controller } from "react-hook-form";

import {Spinner} from "@nextui-org/spinner";
import { DateRangePicker } from "@nextui-org/date-picker";
import {
  CalendarDate,
  parseDate,
  today,
  getLocalTimeZone,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { Image } from "@nextui-org/image";
import pb from "@/database";

type Car = {
  id: number;
  name: string;
  pricePerDay: number;
  capacity: number;
  selfDrive: boolean;
  description: string;
  image: string;
  features: string[];
};

type CarBookingFormProps = {
  car: Car;
};

type IFormData = {
  renterName: string;
  renterEmail: string;
  dateRange: {
    start: CalendarDate;
    end: CalendarDate;
  };
};

const CarBookingForm: React.FC<CarBookingFormProps> = ({ car }) => {
  const {
    control,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<IFormData>();
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const formatter = useDateFormatter({ dateStyle: "long" });

  const onSubmit = async (data: IFormData) => {
    const bookingDetails = {
      type: "Car Rental",
      from: data.dateRange.start.toString(),
      to: data.dateRange.end.toString(),
      car: car,
    };
    try {
      const bookingData = {
        Client_name: data.renterName,
        Client_email: data.renterEmail,
        Booking_details: JSON.stringify(bookingDetails),
        Status: "PENDING",
      };
      await pb.collection("Booking").create(bookingData);
      setBookingSuccess(true);
      reset();
    } catch (error) {
      console.error("Booking failed", error);
      alert("Failed to book. Please try again.");
      reset();
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col justify-center items-center max-w-sm">
      <h2 className="font-semibold uppercase w-full">Booking Form</h2>
      <small>
        Please fill out the form below to book this car. You will receive an
        email with the details.
      </small>
      <div className="flex items-center justify-between w-full">
        <Image src={car.image} width={220} height={220} alt="Car" />
        <h2 className="font-semibold uppercase text-lg leading-none">
          {car.name}
        </h2>
      </div>
      <form
        className="flex flex-col gap-3 w-full pb-4 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" flex flex-col justify-center items-center w-full">
          <Controller
            name="dateRange"
            control={control}
            defaultValue={{
              start: today(getLocalTimeZone()),
              end: today(getLocalTimeZone()),
            }}
            render={({ field }) => (
              <>
                <DateRangePicker
                  label="Rental Dates"
                  color="warning"
                  value={field.value}
                  isDisabled={isSubmitting}
                  variant="underlined"
                  onChange={field.onChange}
                  isRequired
                />
                {errors.dateRange && (
                  <p>{errors.dateRange.message?.toString()}</p>
                )}
              </>
            )}
          />
        </div>
        <div>
          <Controller
            name="renterName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Input
                  id="renter-name"
                  variant="underlined"
                  label="Name"
                  isDisabled={isSubmitting}
                  color="warning"
                  isRequired
                  value={field.value}
                  onChange={field.onChange}
                />
                {errors.renterName && (
                  <p>{errors.renterName.message?.toString()}</p>
                )}
              </>
            )}
          />
        </div>
        <div>
          <Controller
            name="renterEmail"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <Input
                  type="email"
                  id="renter-email"
                  variant="underlined"
                  color="warning"
                  isDisabled={isSubmitting}
                  isRequired
                  label="Email"
                  value={field.value}
                  onChange={field.onChange}
                />
                {errors.renterEmail && (
                  <p>{errors.renterEmail.message?.toString()}</p>
                )}
              </>
            )}
          />
        </div>
        <Button type="submit">Book Now</Button>
      </form>
      {isSubmitting && <Spinner size="lg" color="warning"/>}
      {bookingSuccess && <p>Booking successful!</p>}
    </div>
  );
};

export default CarBookingForm;
