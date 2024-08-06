import FlightBookingForm from "@/components/forms/FlightBooking";
import Image from "next/image";
import Script from "next/script";
export default function Page() {
  return (
    <main className="pt-16 relative">
      <div id="widget-stop" className=" mx-auto flex justify-center"></div>
      <Script
        id="kiwi booking"
        data-affilid="muzurelimitedwidget"
        src="https://widgets.kiwi.com/scripts/widget-search-iframe.js"
      ></Script>
      <div id="widget-holder"></div>
    </main>
  );
}
