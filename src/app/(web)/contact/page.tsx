import { Logo } from "@/components/Layout/icons";
import ContactForm from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";
import { MapPin, MessagesSquare, PhoneCall } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Contact Us Muzure Travel",
  description: "Get in touch with us",
  openGraph: {
    images: "/public/images/6.webp",
  },
};
export default async function Page() {
  return (
    <main className=" min-h-screen flex justify-between w-full flex-wrap pt-20 items-center relative">
      <Image
        src={"/images/6.webp"}
        alt=""
        fill
        sizes="100vw"
        className=" object-cover"
      />
      <div className="z-10 rounded-lg gap-4 drop-shadow-xl bg-background p-5 m-5  max-w-xl flex justify-center items-center">
        <Logo size={100} />
        <div className="flex flex-col gap-2 items-start">
          <h3 className=" font-black text-xl">MUZURE TRAVEL</h3>
          <span className=" flex justify-center items-center gap-3 ">
            <MapPin />
            Office 13,Teco Mall,Mombasa Road,Kenya
          </span>

          <Link
            className=" flex justify-center items-center gap-3 "
            href={siteConfig.social.phonenumber}
          >
            <PhoneCall /> +254 795 805 779
          </Link>
          <Link
            className=" flex justify-center items-center gap-3 "
            href={siteConfig.social.whatsapp}
          >
            <MessagesSquare /> WhatsApp
          </Link>
        </div>
      </div>
      <ContactForm />
    </main>
  );
}
