import pb from "@/database";
import { Accommodation, Room } from "@/types";
import { notFound } from "next/navigation";
import { Image } from "@nextui-org/image";
import { MapPin } from "lucide-react";
import { ListResult } from "pocketbase";
import RoomCard from "@/components/Plugins/Room";

export const revalidate = 3600;

async function getAccommodation(slug: string) {
  try {
    const accommodation = (await pb
      .collection("Accommodation")
      .getFirstListItem(`slug="${slug}"`, {
        expand: "destination",
      })) as unknown as Accommodation;
    return accommodation;
  } catch (error) {
    console.error("Error fetching accommodation:", error);
    return null;
  }
}

async function getRooms(accommodationId: string) {
  try {
    const rooms = (await pb.collection("Room").getList(1, 20, {
      filter: `Accommodation="${accommodationId}"`,
    })) as unknown as ListResult<Room>;
    return rooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const accommodation = await getAccommodation(slug);

  if (!accommodation) {
    return notFound();
  }

  const rooms = await getRooms(accommodation.id);

  return (
    <main className="pt-16 flex flex-col items-start w-full gap-6 relative">
      <div className="w-full flex flex-col items-center relative pb-32 pt-10">
        <Image
          src={accommodation.Image}
          alt={accommodation.Name}
          width={1600}
          className="aspect-square sm:aspect-video"
        />
        <div className="text-4xl text-center bg-background/60 ease-soft-spring duration-500 transition-all w-full h-full absolute hover:backdrop-blur-lg top-0 flex items-center flex-col justify-center mx-auto z-50">
          <h1>{accommodation.Name}</h1>
          <span className="text-base flex gap-3 items-center font-light">
            <MapPin /> {accommodation.expand?.destination.Name}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap w-full justify-center items-center gap-3 pt-10">
        {accommodation.media.map((mediaItem, index) => (
          <Image
            src={mediaItem.image}
            alt={mediaItem.name}
            key={index}
            width={100}
            className="aspect-square"
            isZoomed
          />
        ))}
      </div>
      <div
        className="p-5 prose sm:prose-2xl prose-sm prose-strong:text-foreground prose-headings:text-foreground text-foreground prose-lead:text-foreground prose-p:text-foreground w-full mx-auto"
        dangerouslySetInnerHTML={{ __html: accommodation.details }}
      />
      <div className="flex flex-wrap justify-center gap-3 p-5">
        {rooms?.items.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
