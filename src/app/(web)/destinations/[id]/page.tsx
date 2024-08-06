import TourCard from "@/components/Plugins/TourCard";
import pb from "@/database";
import { Destination, Itinerary, Tour } from "@/types";
import { Image } from "@nextui-org/image";
import { Metadata, ResolvingMetadata } from "next";
import { ListResult } from "pocketbase";

export const revalidate = 43200;

async function getDestinations(id: string) {
  try {
    const des = (await pb
      .collection("Destinations")
      .getOne(id, { requestKey: null, expand: "Country" })) as Destination;
    const Itineraries = (await pb.collection("Itenerary").getList(1, 20, {
      expand: "Stops,Tour",
      requestKey: null,
    })) as ListResult<Itinerary>;

    return { des, itineraries: Itineraries };
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
  const data = await getDestinations(id);

  if (!data?.des) {
    return {
      title: "Destination Not Found",
      description: "The requested destination could not be found.",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  // Create a string of lowercase keywords
  const keywordsArray = [
    data.des.Name.toLowerCase(),
    data.des.expand?.Country?.Name?.toLowerCase(),
    "destination",
    "travel",
    "tourism",
  ].filter(Boolean);

  const keywordsString = keywordsArray.join(", ");

  return {
    title: `${data.des.Name} | Explore Amazing Destinations`,
    description: data.des.Description || `Discover the beauty and attractions of ${data.des.Name}`,
    keywords: keywordsString,
    openGraph: {
      title: data.des.Name,
      description: data.des.Description,
      images: [
        { url: data.des.Image, alt: `${data.des.Name} - Destination Image` },
        ...previousImages
      ],
      type: "website",
      locale: "en_US", // Adjust if you have multiple language versions
      siteName: "Your Travel Company Name",
    },
    twitter: {
      card: "summary_large_image",
      title: data.des.Name,
      description: data.des.Description,
      images: [data.des.Image],
    },
    alternates: {
      canonical: `https://muzuretravel.com/destinations/${id}`,
    },
    other: {
      "geo.region": data.des.expand?.Country?.ISO || "",
      "geo.placename": data.des.Name,
    }
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await getDestinations(id);

  function filterItinerariesByStopId(data: Itinerary[], id: string) {
    return data?.filter((itinerary: Itinerary) =>
      itinerary.Stops.some((stop) => stop === id)
    );
  }

  const Itineraries = filterItinerariesByStopId(data.itineraries.items, id);

  return (
    <main className="min-h-screen  flex flex-col pt-20 relative gap-5">
      <div className=" relative h-fit top-0 items-start w-fit mx-auto">
        <Image
          src={data.des.Image}
          alt="Muzure"
          width={"100%"}
          className="object-cover max-w-3xl transition-all ease-soft-spring duration-1000 min-w-[200px] w-[85vw] m-1  max-h-[50vh] "
          isBlurred
          isZoomed
        />
        <div className=" absolute left-0 right-0 p-[3vw] top-0 justify-end text-white items-start bottom-0 z-20 w-full text-left [text-shadow:_0_3px_10px_rgb(0_0_0_/_60%)] font-semibold text-xl flex flex-col">
          <h1 className=" font-normal leading-none text-2xl">
            {data.des.Name}
          </h1>
          <span className=" uppercase text-base font-light">
            {data.des.expand?.Country.Name}
          </span>
        </div>
      </div>
      <div className="">
        <div
          className=" prose-lg p-10 mt-5 mx-auto prose prose-strong:text-foreground w-full prose-headings:text-foreground text-foreground prose-lead:text-foreground prose-p:text-foreground-default pr"
          dangerouslySetInnerHTML={{ __html: data.des.Details }}
        />
        <div className="w-full flex flex-col justify-center items-center mt-20 gap-4">
          <h3 className="text-2xl font-black">
            {Itineraries.length > 0 ? "Featured Tours" : ""}
          </h3>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {Itineraries?.map((i) => (
              <div key={i.id}>
                <TourCard tour={i.expand?.Tour} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
