import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Bird,
  Camera,
  Compass,
  Mountain,
  Palmtree,
  TentTree,
} from "lucide-react";
import Search from "@/components/Plugins/Search";

function TourSort() {
  return (
    <div className=" w-full px-2  py-5 flex flex-wrap gap-3 items-center justify-between max-w-6xl mx-auto">
      <Search base="/tours" filter={"Details"} />

      <div className=" flex gap-2">
        <Button
          as={Link}
          title="Beach"
          size="lg"
          variant="flat"
          href={`/tours?filter=Type~"BEACH"`}
          isIconOnly
        >
          <Palmtree />
        </Button>
        <Button
          as={Link}
          title="Bird-watching"
          size="lg"
          variant="flat"
          href={`/tours?filter=Type~"BIRDWATCHING"`}
          isIconOnly
        >
          <Bird />
        </Button>
        <Button
          as={Link}
          title="Camping"
          size="lg"
          variant="flat"
          href={`/tours?filter=Type~"CAMPING"`}
          isIconOnly
        >
          <TentTree />
        </Button>
        <Button
          as={Link}
          title="Photography"
          size="lg"
          variant="flat"
          href={`/tours?filter=Type~"PHOTOGRAPHY"`}
          isIconOnly
        >
          <Camera />
        </Button>
        <Button
          as={Link}
          title="Hiking"
          size="lg"
          variant="flat"
          href={`/tours?filter=Type~"HIKING"`}
          isIconOnly
        >
          <Mountain />
        </Button>
        <Button
          as={Link}
          size="lg"
          variant="flat"
          href={`/tours?filter=Type~"SAFARI"`}
          isIconOnly
        >
          <Compass />
        </Button>
      </div>
    </div>
  );
}

export default TourSort;
