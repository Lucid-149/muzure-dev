"use client";
import BlogCard from "@/components/Plugins/BlogCard";
import pb from "@/database";
import { Blog } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ListResult } from "pocketbase";
import type { FC } from "react";
import React from "react";

interface BlogProps {
  id?:string
}
async function getBlogs() {
  try {
    const response = fetch(
      `https://perigee.pockethost.io/api/collections/Blog/records/`
    ).then((response) => {
      if (!response.ok) throw new Error("HTTP error " + response.status);
      return response.json();
    });
    return response as unknown as ListResult<Blog>;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
const BlogComponent: FC<BlogProps> = ({id}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["Blogs"],
    queryFn: async () => await getBlogs(),
  });
  return (
    <div className=" flex flex-col justify-center items-start w-full max-w-7xl mx-auto p-5">
  
      {isLoading && <div>loading...</div>}
      <div className=" flex flex-wrap gap-4 justify-center items-center w-full mt-10">
        {data?.items.map((blog) => (
          blog.id === id ? null :
          <React.Fragment key={blog.id}>
            <BlogCard blog={blog} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BlogComponent;
