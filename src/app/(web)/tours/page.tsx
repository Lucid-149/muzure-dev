import TourSort from "./TourSort";
import { GetData } from "@/classes/data";
import Price from "@/components/Plugins/Price";
import SearchComponent from "@/components/Plugins/Search";
import TourCard from "@/components/Plugins/TourCard";
import pb from "@/database";
import { Tour, TourPrices } from "@/types";
import { ButtonGroup, Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Metadata } from "next";
import React from "react";

export const revalidate = 60;

async function getTours(params: {
  [key: string]: string | string[] | undefined;
}) {
  const { page, filter } = params;
  try {
    const getDataOperation = new GetData<Tour>(
      pb,
      "Tour",
      page ? parseInt(page as string) : 1,
      6,
      filter ? (filter as string) : ""
    );
    const result = await getDataOperation.execute();
    const getPrices = new GetData<TourPrices>(
      pb,
      "Tour_prices",
      1,
      100,
      'created >= "2022-01-01 00:00:00"'
    );
    const prices = await getPrices.execute();
    return { result, prices };
  } catch (error) {
    console.error("Error:", error);
    throw error; // Propagate the error further
  }
}

export const metadata: Metadata = {
  title: "Our Tours",
  description:
    "Discover our curated African tours, offering unforgettable experiences and breathtaking adventures across the continent. From thrilling safaris to cultural explorations, we provide immersive journeys that showcase the best of Africa.",
};
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { result, prices } = await getTours(searchParams);

  function isPrice(id: string) {
    const price = prices?.items.find((item) => item.tour === id);
    if (!price) return 0;
    return (
      price.Price_per_adult +
      price.Accommodation_price_per_person_sharing +
      price.Meal_price_per_person
    );
  }

  return (
    <div className="flex min-h-screen w-screen overflow-hidden flex-col items-center justify-center p-5 pt-20">
      <TourSort />
      {!result && <h1 className="font-black text-3xl">No Tours Found</h1>}
      <div className="flex flex-wrap flex-1 gap-3 mx-auto w-full max-w-7xl justify-evenly items-center">
        {result?.items.map((tour) => (
          <div
            className="relative w-fit overflow-hidden rounded-lg border border-secondary/5"
            key={tour.id}
          >
            <TourCard tour={tour} />
            <div className="hover:text-foreground shadow-lg shadow-focus rounded-tr-lg w-12 h-4 text-background hover:w-fit transition-all ease-in-out duration-500 hover:h-fit overflow-hidden rounded-bl-2xl top-0 right-0 p-3 z-10 absolute bg-background">
              {isPrice(tour.id) === 0 ? null : (
                <Price price={isPrice(tour.id)} />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full p-5 flex flex-col justify-center items-start px-[10vw]">
        <ButtonGroup className="w-fit" variant="flat">
          {Array.from({ length: result?.totalPages || 0 }, (_, i) => i + 1).map(
            (pageNumber) => (
              <Button
                key={pageNumber}
                as={Link}
                color="secondary"
                className="text-default-foreground"
                variant={result?.page === pageNumber ? "solid" : "flat"}
                href={`/tours?page=${pageNumber}`}
                isIconOnly
              >
                {pageNumber}
              </Button>
            )
          )}
        </ButtonGroup>
      </div>
    </div>
  );
}
