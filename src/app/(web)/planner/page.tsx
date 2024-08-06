async function customFunction() {
  
}

export default async function Page() {
  const data = await customFunction();
  return <main>
    <h1>Coming Soon</h1>
    <p>Page is under construction</p>
  </main>;
}