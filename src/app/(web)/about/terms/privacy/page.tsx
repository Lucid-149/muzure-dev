import pb from "@/database";

async function getTerms() {
  try {
    const page = await pb.collection("Pages").getOne("jf65420wbnscmxq", {});
    return page;
  } catch (error) {}
}

export default async function Page() {
  const data = await getTerms();
  return (
    <main className=" p-[5vw]">
      <div
        className=" prose-xl prose-a:text-focus  prose-h1:text-2xl prose-headings:text-xl mt-20 mx-auto prose prose-strong:text-foreground  w-full prose-headings:text-foreground text-foreground prose-lead:text-foreground prose-p:text-foreground"
        dangerouslySetInnerHTML={{ __html: data?.Details }}
      />
    </main>
  );
}
