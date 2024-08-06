import { GetData } from "@/classes/data";
import CountryCard from "@/components/Plugins/CountryCard";
import DestinationCard from "@/components/Plugins/DestinationCard";
import PaginationComponent from "@/components/Plugins/Pagination";
import pb from "@/database";
import { Country, Destination } from "@/types";

import { notFound } from "next/navigation";
import React from "react";
export const revalidate = 42360;

async function getDestinations(params: {
  [key: string]: string | string[] | undefined;
}) {
  const { page, filter } = params;
  try {
    const getDataOperation = new GetData<Destination>(
      pb,
      "Destinations",
      page ? parseInt(page as string) : 1,
      14,
      filter ? (filter as string) : 'created >= "2022-01-01 00:00:00"'
    );
    const getDataOperation2 = new GetData<Country>(
      pb,
      "Country",
      1,
      50,
      'created >= "2022-01-01 00:00:00"'
    );
    const result2 = await getDataOperation2.execute();
    const result = await getDataOperation.execute();
    return { result, result2 };
  } catch (error) {}
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getDestinations(searchParams);
  if (!data) {
    return notFound();
  }
  return (
    <main className=" flex flex-wrap gap-8 pt-20 p-5 mx-auto  w-full justify-center items-center">
      <div className=" w-full grid grid-flow-col gap-3 overflow-x-scroll pb-4 ">
        {data.result2?.items.map((c) => (
          <React.Fragment key={c.id}>
            <CountryCard county={c} />
          </React.Fragment>
        ))}
      </div>
      {data.result?.items.map((d) => (
        <React.Fragment key={d.id}>
          <DestinationCard destination={d} />
        </React.Fragment>
      ))}
      <div className=" w-full p-5 flex flex-col justify-center items-start">
        <PaginationComponent
          totalPages={data.result.totalPages}
          currentPage={data.result.page}
          url="/destinations"
        />
      </div>
    </main>
  );
}
