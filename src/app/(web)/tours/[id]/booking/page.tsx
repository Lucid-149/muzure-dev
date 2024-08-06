import { GetData } from "@/classes/data";
import BookingFrom from "@/components/forms/BookingForm";
import pb from "@/database";
import { Tour, TourPrices, Itinerary, Destination } from "@/types";
import { ResolvingMetadata, Metadata } from "next";
import IT from "@/components/Plugins/Itenerary";
import { Image } from "@nextui-org/image";

async function getTour(id: string) {
  try {
    const result = (await pb.collection("Tour").getOne(id, {
      expand: "Countries,Destinations",
    })) as unknown as Tour;
    const getPrices = new GetData<TourPrices>(
      pb,
      "Tour_prices",
      1,
      3,
      `tour = "${id}"`
    );
    const prices = await getPrices.execute();
    const getItinerary = new GetData<Itinerary>(
      pb,
      "Itenerary",
      1,
      3,
      `Tour = "${id}"`
    );
    const itinerary = await getItinerary.execute();
    return { result, prices, itinerary };
  } catch (error) {
    console.error("Error:", error);
    throw error; // Propagate the error further
  }
}
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const data = await getTour(id);
  if (!data?.result) {
    return {
      title: "Tour Not Found",
    };
  }
  return {
    title: data.result.Name,
    description: data.result.Description,
    keywords: data.result.Type,
    openGraph: {
      images: data.result.Image,
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await getTour(id);
  const price = data.prices.items.find(
    (element) => element.tour === data.result.id
  );
  const des = data.result.expand?.Destinations as Destination[];

  const pricePerAdult = price
    ? price.Price_per_adult + price.Accommodation_price_per_person_sharing
    : 100;
  return (
    <main
      
      className=" min-h-screen bg-cover flex bg-bottom flex-wrap justify-between"
    >
      <div className=" z-20 max-w-4xl  p-5 w-full">
        <h1 className=" text-2xl mb-10 font-black leading-none">{data.result.Name}</h1>
        <Image src={data.result.Image}  alt={data.result.Name} className=" aspect-square object-cover object-left-bottom w-full" />
        <p className="  mb-6 ">{data.result.Description}</p>
        <div className=" w-full pr-10">
        {data.itinerary.items.map((d) => (
          <div key={d.id}>
            <IT itenerary={d} />
          </div>
        ))}
      </div>
      </div>

      <div className=" z-20 max-w-5xl  ">
        <BookingFrom tour={data.result} tour_rates={data.prices.items} />
      </div>
    </main>
  );
}
