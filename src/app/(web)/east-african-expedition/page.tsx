import FeaturedTour from "@/components/Pages/elements/FeaturedTour";
import { EastAficanExperience } from "@/database/FeaturedTours";
import { Image } from "@nextui-org/image";

export default function Page() {
  return (
    <main className=" min-h-screen flex flex-col justify-center items-center">
      <Image
        src={"https://utfs.io/f/9b6c8663-21e9-4d5b-87a6-d2b5f53b58c7-1d.jpg"}
        alt="East african adventure"
        className=" -z-10 object-cover w-full border"
      />
      <FeaturedTour {...EastAficanExperience} />
    </main>
  );
}
