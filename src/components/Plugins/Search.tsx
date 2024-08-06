"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FC } from "react";

interface SearchProps {
  filter: string;
  base: string;
}

const Search: FC<SearchProps> = ({ filter, base }) => {
  const [text, setText] = useState("");
  const router = useRouter()
  return (
    <div className=" flex items-center w-full max-w-md pb-10 relative">
      <Input
        placeholder="What are you looking for ?"
        variant="underlined"
        size="lg"
        value={text}
        onKeyDown={()=>router.push(`${base}?filter=${filter}~"${text}"`)}
        onValueChange={(e) => setText(e)}
      />{" "}
      <Button
        as={Link}
        className=" absolute right-0"
        href={`${base}?filter=${filter}~"${text}"`}
        isIconOnly
        variant="light"
      >
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
