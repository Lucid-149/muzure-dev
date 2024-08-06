//import Flip from "@/components/Plugins/Flip";
import { siteConfig } from "@/config/site";
import { Suspense, type FC } from "react";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import dynamic from "next/dynamic";
import { Logo } from "@/components/Layout/icons";
const Flip = dynamic(() => import("@/components/Plugins/Flip"), { ssr: false });

interface HeroProps {}

const Hero: FC<HeroProps> = () => {
  return (
    <section className=" relative w-screen h-screen  bg-background">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
      >
        <source
          src={
            "https://utfs.io/f/60da6195-1e8e-4235-b257-3f067879b2bf-216268.webm"
          }
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>
      <div className=" absolute top-4 right-4 mb-5 flex items-center flex-wrap z-10"></div>
      <div className=" items-start bg-background/80 border border-foreground/10 rounded-xl absolute z-50  bottom-20 m-[1vw] max-w-md p-5 backdrop-blur-md drop-shadow-2xl">
        <h1 className=" text-2xl font-black uppercase">Muzure Travel</h1>
        <h3 className=" text-lg font-medium mb-2 max-w-3xl leading-none">
          Your Journey <span className=" text-focus">Starts Here !</span>
        </h3>
        <p className=" text-base mb-4">{siteConfig.description}</p>
        <Button
          as={Link}
          color="secondary"
          showAnchorIcon
          href="/tours"
          variant="shadow"
          size="lg"
          fullWidth
          className=" h-16 uppercase mt-2 text-white font-medium"
        >
          Book a tour
        </Button>
      </div>
    </section>
  );
};

export default Hero;
