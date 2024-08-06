import { Image } from "@nextui-org/image";
import { Metadata } from "next";
import { Team } from "./staff";
import { Card } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import Script from "next/script";
export const metadata: Metadata = {
  title: "About Us",
  description: "Travel should be more than just a destination",
  keywords: [
    "Muzure Travel",
    "Kenya travel",
    "East Africa adventures",
    "Travel experiences",
    "Wildlife safaris",
    "Cultural experiences",
    "Sustainable tourism",
    "Personalized itineraries",
    "Unforgettable memories",
    "Responsible travel",
  ],
};
export default function Page() {
  return (
    <div className="p-10 mt-20  max-w-6xl text-lg mx-auto flex flex-col gap-4 ">
      <h1 className=" text-4xl text-center   font-black ">
        About Muzure Travel
      </h1>
      <h3 className=" text-xl font-semibold text-center capitalize">
        Your gateway to extraordinary adventures in Kenya & the rest East Africa
      </h3>
      <p>
        Welcome to Muzure, a premier travel company based in the heart of Kenya.
        We are passionate about creating exceptional travel experiences that
        immerse you in the breathtaking beauty, rich culture, and diverse
        wildlife of this extraordinary country. With Muzure as your trusted
        companion, you can unlock the true essence of Kenya, venturing beyond
        the beaten path and discovering hidden gems that will leave an indelible
        mark on your soul.
      </p>
      <p>
        At Muzure, we believe that travel is not just about visiting
        destinations but about forging meaningful connections with the people,
        nature, and heritage of a place. Our dedicated team of travel
        enthusiasts, local experts, and professional guides work tirelessly to
        curate bespoke itineraries that cater to your unique interests,
        preferences, and dreams. Whether you seek exhilarating wildlife safaris,
        awe-inspiring landscapes, immersive cultural experiences, or thrilling
        outdoor adventures, Muzure has the perfect journey awaiting you.
      </p>
      <div>
        <p>
          We believe that travel should be more than just a destination; it
          should be a transformation. Our name, derived from the Swahili word
          &apos;muzuri&apos; meaning &apos;good,&apos; encapsulates our mission
          to curate journeys that not only enrich your soul but also benefit our
          world.
        </p>
      </div>
      <div className=" text-base">
        <h2 className="font-bold text-2xl text-center">Why Choose Muzure?</h2>

        <h3 className="font-bold text-lg uppercase first-letter:text-focus first-letter:text-2xl">
          1. Unparalleled Expertise
        </h3>
        <p className="">
          With years of experience in the travel industry and an intimate
          knowledge of Kenya, our team possesses unparalleled expertise in
          creating unforgettable travel experiences. We have carefully
          handpicked a collection of the most authentic and awe-inspiring
          destinations, accommodations, and activities, ensuring every aspect of
          your journey is crafted to perfection.
        </p>

        <h3 className="font-bold text-lg uppercase first-letter:text-focus first-letter:text-2xl">
          2. Personalized Approach
        </h3>
        <p className="">
          We understand that each traveler is unique, with distinct desires and
          aspirations. That&apos;s why we take a personalized approach to tailor
          your trip to your exact specifications. Our team will work closely
          with you, taking into account your preferences, budget, and time
          constraints, to design a bespoke itinerary that surpasses your
          expectations.
        </p>

        <h3 className="font-bold text-lg uppercase first-letter:text-focus first-letter:text-2xl">
          3. Responsible Travel
        </h3>
        <p className="">
          Muzure is committed to promoting sustainable and responsible tourism
          practices. We collaborate with local communities, support conservation
          initiatives, and strive to minimize our ecological footprint. By
          choosing Muzure, you contribute to the preservation of Kenya&apos;s
          natural and cultural heritage, ensuring its beauty endures for
          generations to come.
        </p>

        <h3 className="font-bold text-lg uppercase first-letter:text-focus first-letter:text-2xl">
          4. Seamless Travel Experience
        </h3>
        <p className="">
          From the moment you start planning your trip until you bid farewell to
          Kenya, we ensure a seamless and hassle-free travel experience. Our
          team handles all the logistics, including transportation,
          accommodations, activities, and permits, allowing you to focus on
          immersing yourself in the wonders of Kenya without any worries.
        </p>

        <h3 className="font-bold text-lg uppercase first-letter:text-focus first-letter:text-2xl">
          5. Unforgettable Memories
        </h3>
        <p className="">
          Our ultimate goal is to create memories that will last a lifetime. We
          go the extra mile to ensure that every aspect of your journey is
          filled with wonder, excitement, and joy. Whether you are witnessing
          the Great Wildebeest Migration, gazing at the majestic Mount
          Kilimanjaro, or interacting with Maasai warriors, we strive to make
          every moment extraordinary.
        </p>
      </div>

      <p>
        Your journey with Muzure Travel is as unique as you are. Whether
        you&apos;re a solo explorer, a couple seeking a romantic getaway, or a
        family in search of new horizons, we craft personalized itineraries that
        resonate with your desires and values.
      </p>
      <p>
        We can&apos;t wait to embark on this journey with you. Reach out to our
        team to start planning your next adventure with Muzure Travel. Together,
        let&apos;s explore the world with a free spirit and a heart full of
        goodness.
      </p>

      <div className=" flex flex-wrap justify-center items-center gap-8">
        {Team.map((s, i) => (
          <div
            className=" bg-background flex flex-col p-3 max-w-sm flex-col items-center"
            key={i}
          >
            <Image
              isBlurred
              width={300}
              height={300}
              src={s.profile}
              alt={`${s.name}-team member`}
            />
            <div></div>
            <span className=" text-lg font-bold">{s.name}</span>
            <small className=" uppercase font-medium">{s.position}</small>
            <Link className=" text-focus text-xs" href={`mailto:${s.email}`}>
              {s.email}
            </Link>
          </div>
        ))}
      </div>

      <div className=" flex justify-center items-center">
        <Image
          src={"/images/tra.png"}
          width={300}
          height={500}
          className="object-contain "
          alt=""
        />
      </div>
    </div>
  );
}
