import CarsComponent from "@/components/Plugins/Cars";
import pb from "@/database";
import { Image } from "@nextui-org/image";
import { ChevronRight } from "lucide-react";

export default function Page() {
  return (
    <main className=" relative flex flex-col p-[5vw] pt-20 max-w-6xl mx-auto">
      <div className=" relative">
        <section className=" text-background [text-shadow:_0_3px_10px_rgb(0_0_0_/_60%)] absolute z-20 my-auto p-2 bottom-2">
          <h1 className=" text-3xl uppercase leading-none font-black">
            Car Rental
          </h1>
          <p className=" font-semibold text-sm uppercase">
            Explore the World on Your Own Terms
          </p>
        </section>
        <Image
          src="https://images.unsplash.com/photo-1529369623266-f5264b696110?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          isBlurred
          className=" w-full aspect-video object-cover mx-auto"
        />
      </div>
      <div className=" text-base">
        <section className=" pt-10">
          <p className=" text-lg">
            Welcome to Muzure Travel&apos;s premier car rental service, where
            your journey begins with the freedom and flexibility to explore at
            your own pace. Whether you&apos;re embarking on a solo adventure, a
            family vacation, or a business trip, we have the perfect vehicle to
            match your needs.
          </p>
          <h2 className=" font-semibold text-xl pt-10">
            Why Choose Muzure Travel Car Rental?
          </h2>
          <ul className=" list-disc list-outside pl-5 ">
            <li>
              <strong>Wide Selection of Vehicles:</strong> From compact cars for
              city exploration to spacious SUVs for family trips, and luxury
              sedans for business travel, our diverse fleet ensures you find the
              right vehicle for any occasion.
            </li>
            <li>
              <strong>Competitive Pricing:</strong> Enjoy transparent pricing
              with no hidden fees. Our competitive rates and special offers
              provide excellent value for money, making your travels both
              enjoyable and affordable.
            </li>
            <li>
              <strong>Convenient Locations:</strong> With rental locations in
              major cities, airports, and popular tourist destinations, picking
              up and dropping off your vehicle is hassle-free, wherever your
              journey takes you.
            </li>
            <li>
              <strong>Flexible Rental Plans:</strong> Whether you need a car for
              a few hours, a day, a week, or longer, our flexible rental plans
              cater to your specific requirements. Enjoy the convenience of
              short-term or long-term rentals with customizable options.
            </li>
            <li>
              <strong>Top-Notch Customer Service:</strong> Our dedicated
              customer service team is available 24/7 to assist you with
              reservations, changes, and any inquiries. Experience seamless
              support from booking to return.
            </li>
            <li>
              <strong>Modern and Well-Maintained Fleet:</strong> Drive with
              confidence knowing that our vehicles are regularly serviced and
              maintained to the highest standards of safety and performance.
            </li>
          </ul>
        </section>

        <section className=" pt-10">
          <h2 className=" font-semibold text-xl">
            How to Rent a Car with Muzure Travel
          </h2>
          <ol className=" list-disc list-outside pl-5">
            <li>
              <strong>Choose Your Vehicle:</strong> Browse our extensive range
              of vehicles online or visit our rental locations to select the car
              that best suits your needs.
            </li>
            <li>
              <strong>Make a Reservation:</strong> Easily book your rental car
              through our user-friendly website or mobile app. Enter your
              pick-up and drop-off dates and locations, choose any additional
              options, and confirm your reservation.
            </li>
            <li>
              <strong>Pick Up Your Car:</strong> Head to your selected Muzure
              Travel location with your confirmation details and driver&apos;s
              license. Our friendly staff will guide you through the quick and
              easy pick-up process.
            </li>
            <li>
              <strong>Enjoy the Journey:</strong> Hit the road and explore your
              destination with the comfort and convenience of a Muzure Travel
              rental car. Need assistance during your trip? Our customer support
              team is just a call away.
            </li>
            <li>
              <strong>Return the Vehicle:</strong> At the end of your rental
              period, return the car to your chosen Muzure Travel location. Our
              swift and efficient return process ensures a smooth conclusion to
              your rental experience.
            </li>
          </ol>
          <h2 className=" font-semibold text-xl pt-20 flex items-center">
            Our starndard vehicles <ChevronRight/>
          </h2>
          <CarsComponent />
        </section>

        <section className=" pt-10">
          <h2 className=" font-semibold text-lg">Additional Services</h2>
          <ul className=" list-disc list-outside pl-5">
            <li>
              <strong>GPS Navigation Systems:</strong> Never get lost with our
              optional GPS units, available for a small additional fee.
            </li>
            <li>
              <strong>Child Safety Seats:</strong> Traveling with young
              children? We offer a range of child safety seats to ensure your
              little ones travel safely and comfortably.
            </li>
            <li>
              <strong>Roadside Assistance:</strong> Enjoy peace of mind with our
              comprehensive roadside assistance service, available 24/7 for any
              unexpected issues on the road.
            </li>
            <li>
              <strong>Insurance Options:</strong> Choose from a variety of
              insurance plans to suit your needs, including collision damage
              waivers and personal accident coverage, for a worry-free rental
              experience.
            </li>
          </ul>
        </section>

        <section className=" pt-10">
          <h2 className=" font-semibold text-xl">Join Muzure Travel Rewards</h2>
          <p>
            Become a Muzure Travel Rewards member and enjoy exclusive benefits
            such as discounts on future rentals, priority service, and special
            promotions. Sign up today and start earning rewards with every
            rental!
          </p>
        </section>

        <section>
          <h2 className=" font-semibold text-xl">Contact Us</h2>
          <p>
            Have questions or need assistance? Our customer service team is here
            to help. Reach out to us via phone, email, or live chat, and
            we&apos;ll ensure you have all the information you need for a
            fantastic rental experience.
          </p>
        </section>
      </div>
    </main>
  );
}
