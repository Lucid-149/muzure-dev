import React from "react";
import Image from "next/image";

interface SectionProps {
  title: string;
  subtitle?: string;
  text?: string;
  image: string;
  children?: React.ReactNode | React.ReactElement;
}

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  text,
  image,
  children,
}) => {
  return (
    <div
      className="relative flex  h-screen items-center justify-center  w-full bg-fixed bg-bottom"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex absolute top-0 left-0 items-center justify-center w-full h-full px-12  bg-gradient-to-t from-background to-background/5">
      </div>
        <div className="flex backdrop-blur-xl flex-col items-start justify-center   mx-4 p-[2vw] shadow-2xl rounded-2xl  bg-background/70 max-w-5xl my-32">
          <h2 className={"font-black text-xl"}>{title}</h2>
          <h3 className={" text-lg font-semibold"}> {subtitle}</h3>
          <p className="">{text}</p>

          {children}
        </div>
    </div>
  );
};
export default Section;
