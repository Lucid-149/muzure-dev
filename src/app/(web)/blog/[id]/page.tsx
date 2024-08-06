import BlogComponent from "@/components/Pages/elements/Blog";
import { Blog } from "@/types";
import { Image } from "@nextui-org/image";
import { Metadata, ResolvingMetadata } from "next";

async function getData(id: string) {
  try {
    const response = fetch(
      `https://perigee.pockethost.io/api/collections/Blog/records/${id}`
    ).then((response) => {
      if (!response.ok) throw new Error("HTTP error " + response.status);
      return response.json();
    });
    return response as unknown as Blog;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const data = await getData(id);

  if (!data) {
    return {
      title: "Article Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data.title,
    description: data.subtitle,
    openGraph: {
      images: [
        `https://perigee.pockethost.io/api/files/${data.collectionId}/${data.id}/${data.image}`,
        ...previousImages,
      ],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);

  return (
    <div className=" p-5">
      <div className=" mx-auto w-full flex flex-col relative pt-20 justify-center items-center">
        <Image
          src={`https://perigee.pockethost.io/api/files/${data.collectionId}/${data.id}/${data.image}`}
          className="w-full max-w-4xl aspect-video object-cover object-bottom"
        isBlurred
        removeWrapper
          alt={data.title}
        />
      </div>
        <div className=" flex flex-col justify-center items-center text-center z-20">
          <h1 className=" text-2xl font-black">{data.title}</h1>
          <h3 className=" font-semibold text-lg">{data.subtitle}</h3>
        </div>
      <div
        className=" sm:prose-2xl prose-base  mt-5 mx-auto prose prose-strong:text-foreground w-full prose-headings:text-foreground text-foreground prose-lead:text-foreground prose-p:text-foreground-default "
        dangerouslySetInnerHTML={{ __html: data.body }}
      />
      <BlogComponent id={data.id}/>
    </div>
  );
}
