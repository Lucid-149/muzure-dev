async function customFunction() {
  
}

export default async function Page() {
  const data = await customFunction();
  return <main></main>;
}