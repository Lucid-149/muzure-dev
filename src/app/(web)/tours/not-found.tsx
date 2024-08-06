import Image from "next/image";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start justify-center w-full h-screen mx-auto drop-shadow-2xl">
      <Image
        src={
          "https://utfs.io/f/e0a206cb-d420-49d5-9901-dbde976b32a2-uq61td.jpg"
        }
        alt=""
        className="object-cover -z-10"
        fill
        sizes="100vw"
      />
      <div className="flex flex-col items-center justify-center w-full h-full bg-background/50 backdrop-blur-sm">
        <AlertTriangle size={300} />
        <h1 className={"text-8xl font-black"}>404</h1>
        <h2 className="text-3xl">Tour not found</h2>
        <p className="">Getting lost is part of the journey</p>
        <Button
          href="/"
          as={Link}
          color={"default"}
          showAnchorIcon
          variant="solid"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
