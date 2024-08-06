import dynamic from "next/dynamic";
import { GetData } from "@/classes/data";
import pb from "@/database";
import { Destination } from "@/types";
const HomePage = dynamic(() => import("@/components/Pages/Home"));
export const revalidate = 3600;
async function getDestinations() {
  try {
    const getDataOperation = new GetData<Destination>(
      pb,
      "Destinations",
      1,
      4,
      'created >= "2022-01-01 00:00:00"',
      "Country"
    );
    const result = await getDataOperation.execute();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Propagate the error further
  }
}

export default async function Home() {
  const destinations = await getDestinations();
  return (
    <main className="flex min-h-screen w-screen overflow-hidden flex-col items-center justify-between">
      <HomePage destinations={destinations} />
    </main>
  );
}
