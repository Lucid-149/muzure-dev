import { Blog } from "@/types";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import type { FC } from "react";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = (blog) => {
  return (
    <div
      className="flex flex-col group z-0 relative items-center justify-end aspect-square max-w-sm w-full m-1 shadow-lg hover:shadow-xl transition duration-300 rounded-xl overflow-hidden"
    >
        <Image
          src={`https://perigee.pockethost.io/api/files/${blog.blog.collectionId}/${blog.blog.id}/${blog.blog.image}`}
          alt="blog"
          removeWrapper
          className="w-full h-full absolute top-0 bottom-0 left-0 right-0 z-0 object-cover"
        />
        <Link href={`/blog/${blog.blog.id}`} className="flex flex-col  w-full p-1 z-10 bg-background/60 backdrop-blur-md group-hover:h-full justify-center h-1/3 transition-all items-center text-center">
          <h3 className=" text-lg font-bold">
            {blog.blog.title}
          </h3>
          <p className=" font-light">{blog.blog.subtitle}</p>
        </Link>
    
    </div>
  );
};

export default BlogCard;
