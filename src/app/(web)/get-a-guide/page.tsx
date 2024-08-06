export default function Page({
  searchParams,
}: {
  searchParams: { agent: string };
}) {
  const agent = searchParams.agent;
  return (
    <main>
      <h1>Welcome to Muzure Travels guide booking system</h1>
      <p>
        We provide a simple request based system to match you with a guide that best suite your needs 
      </p>
      
    </main>
  );
}
