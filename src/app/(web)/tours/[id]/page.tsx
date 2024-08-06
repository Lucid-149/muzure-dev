import { GetData } from "@/classes/data";
import BreadCrumbs from "@/components/Plugins/Breadcrumbs";
import IT from "@/components/Plugins/Itenerary";
import Price from "@/components/Plugins/Price";
import pb from "@/database";
import { Destination, Itinerary, Tour, TourPrices } from "@/types";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Share2 } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
export const revalidate = 0;
async function getTour(id: string) {
  try {
    const result = (await pb.collection("Tour").getOne(id, {
      expand: "Countries,Destinations",
      requestKey: null,
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
    throw error;
  }
}

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const data = await getTour(id);
  const previousImages = (await parent).openGraph?.images || [];

  // Ensure that Countries is an array of strings and convert to lowercase


  // Create a string of lowercase keywords
  const keywordsArray = [
    data.result.Type.map((type)=>type.toLowerCase()),
    "tour",
    "travel",
    "adventure",
  ];
  const keywordsString = keywordsArray.join(", ");

  return {
    title: `${data.result.Name} | Your Tour Company`,
    description: data.result.Description,
    keywords: keywordsString,
    openGraph: {
      title: data.result.Name,
      description: data.result.Description,
      images: [{ url: data.result.Image, alt: data.result.Name }, ...previousImages],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.result.Name,
      description: data.result.Description,
      images: [data.result.Image],
    },
  };
}


export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await getTour(id);
  const price = data.prices.items.find(
    (element) => element.tour === data.result.id
  );
  const destinations = data.result.expand?.Destinations as Destination[];

  const pricePerAdult = price
    ? price.Price_per_adult + price.Accommodation_price_per_person_sharing
    : 100;

  return (
    <main className="pt-20  h-full p-[1vw] w-[95vw] mx-auto flex flex-wrap justify-center items-center">
      <div className=" w-full h-full gap-3 flex  flex-wrap items-start justify-center">
        <div className=" w-full min-w-72 max-w-6xl">
          <BreadCrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Tours", href: "/tours" },
              {
                label: `${data.result.Name}`,
                href: `/country/${data.result.Countries[0]}`,
              },
            ]}
          />
          <h1 className="text-xl mb-10 font-black">{data.result.Name}</h1>
          <Image
            isZoomed
            isBlurred
            src={data.result.Image}
            alt={data.result.Description}
            className="aspect-square object-cover"
            width={800}
          />
          <div className="py-5 -w-full flex-col flex justify-start items-start">
            <div
              className="prose-p:text-base prose prose-strong:text-foreground prose-headings:text-foreground text-foreground prose-lead:text-foreground prose-p:text-foreground"
              dangerouslySetInnerHTML={{ __html: data.result.Details }}
            />
          </div>
        </div>
        <div className=" w-full min-w-72 max-w-lg sticky top-10">
          <div className="my-3 flex justify-between items-center w-full">
            <div className="font-bold">
              <span className="text-4xl font-black">
                {data.result.Duration_in_days}
              </span>{" "}
              <small className="uppercase">Days</small>
            </div>
            <Button className="" isIconOnly variant="flat">
              <Share2 />
            </Button>
          </div>
          <div
            className={`flex-wrap gap-10 pb-10 justify-between items-center w-full ${
              data.result.published ? "flex" : "hidden"
            }`}
          >
            <Price price={pricePerAdult * 1.05} />
            <Button
              endContent={
                <div className="pb-2 text-[10px] opacity-25 h-full items-end text-background absolute top-0 flex">
                  {" "}
                  Powered by weTravel
                </div>
              }
              as={Link}
              variant="shadow"
              color="secondary"
              size="lg"
              fullWidth
              className="wtrvl-checkout_button"
              id="wetravel_button_widget"
              data-env="https://www.wetravel.com"
              data-version="v0.3"
              data-uid="1066347"
              style={{
                textTransform: "uppercase",
                height: "84px",
                justifyContent: "end",
                fontSize: "32px",
                color: "skyblue",
              }}
              data-uuid={data.result.Tour_uuid}
              href={`https://www.wetravel.com/checkout_embed?uuid=${data.result.Tour_uuid}`}
            >
              Book Now
            </Button>
          </div>
          <div className=" flex w-full gap-2">
            {destinations?.map((destination) => (
              <div
                className=" w-1/4 rounded-lg"
                title={destination.Name}
                key={destination.id}
              >
                <Image
                  className="aspect-square object-cover w-full "
                  isZoomed
                  isBlurred
                  src={destination.Image}
                  alt={destination.Name}
                />
              </div>
            ))}
          </div>
          <div className="w-full">
            {data.itinerary.items.map((item) => (
              <div key={item.id}>
                <IT itenerary={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
