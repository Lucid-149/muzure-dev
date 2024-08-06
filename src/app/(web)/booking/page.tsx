import AirlinesList from "./components/Airlines";
export default async function Page() {
  return (
    <main className=" pt-20">
        <h1 className="text-center text-4xl font-bold leading-tight">
          Muzure Bookings
        </h1>
        <section className="flex flex-col justify-start max-w-screen-lg mx-auto">
        
        </section>
        <AirlinesList />
    </main>
  );
}
