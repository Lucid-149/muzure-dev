import { GetData } from "@/classes/data";
import pb from "@/database";
import { Metadata, ResolvingMetadata } from "next";
import { Country, Destination } from "@/types";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

async function getCountry(name: string) {
  try {
    const country = (await pb
      .collection("Country")
      .getFirstListItem(`Name~"${name}"`, {
        requestKey: null,
      })) as unknown as Country;

    return country;
  } catch (error) {
    console.error(error);
  }
}
async function getDestinations(id: string) {
  try {
    const getDataOperation = new GetData<Destination>(
      pb,
      "Destinations",
      1,
      50,
      `Country = "${id}"`
    );
    const des = await getDataOperation.execute();

    return des;
  } catch (error) {}
}

export async function generateMetadata(
  { params }: { params: { country: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.country;
  const n = decodeURIComponent(id);
  const data = await getCountry(n);

  const previousImages = (await parent).openGraph?.images || [];

  if (!data) {
    return {
      title: "Country Not Found | Muzure Travel",
      description: "The requested country information could not be found.",
    };
  }

  const keywordsArray = [
    data.Name.toLowerCase(),
    "travel",
    "tourism",
    "destinations",
  ].filter(Boolean);

  const keywordsString = keywordsArray.join(", ");

  return {
    title: `${data.Name} | Muzure Travel`,
    description:
      data.Description || `Explore amazing destinations in ${data.Name}`,
    keywords: keywordsString,
    openGraph: {
      title: `Discover ${data.Name} | Muzure Travel`,
      description: data.Description,
      images: [
        { url: data.Image, alt: `${data.Name} - Country Image` },
        ...previousImages,
      ],
      type: "website",
      locale: "en_US",
      siteName: "Muzure Travel",
    },
    twitter: {
      card: "summary_large_image",
      title: `Explore ${data.Name}`,
      description: data.Description,
      images: [data.Image],
    },
    alternates: {
      canonical: `https://muzuretravel.com/country/${encodeURIComponent(
        data.Name
      )}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: { country: string };
}) {
  const country = params.country;
  const c = decodeURIComponent(country);
  const data = await getCountry(c);

  if (!data) {
    return <div>Error loading destinations</div>;
  }
  const des = await getDestinations(data.id);

  return (
    <main className="min-h-screen p-[5vw] flex flex-wrap justify-center items-center pt-20 relative gap-5">
      <Image
        src={data.Image}
        alt={"image of " + data.Name}
        height={320}
        width={1600}
        className="w-full max-w-7xl"
      />
      <div className="w-full p-5 max-w-7xl">
        <h1 className="text-3xl font-black">{data.Name}</h1>
        <p className="text-base">{data.Description}</p>
      </div>
      <div className="flex flex-col gap-10">
        {des?.items.map((d) => (
          <div
            key={d.id}
            className="flex w-full border-b pb-3 border-foreground/25 sm:odd:flex-row-reverse flex-col sm:flex-row max-w-6xl justify-between items-center"
          >
            <Image
              src={d.Image}
              height={500}
              width={500}
              alt={"image of " + d.Name}
              className="aspect-square object-cover w-full max-w-lg"
              isBlurred
              isZoomed
            />
            <div className="flex flex-col m-5 max-w-lg gap-2 w-full min-w-80">
              <h4 className="text-xl leading-none font-black">{d.Name}</h4>
              <p className="text-base">{d.Description}</p>
              <Button
                as={Link}
                className="w-fit"
                showAnchorIcon
                href={`/destinations/${d.id}`}
              >
                View More
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
