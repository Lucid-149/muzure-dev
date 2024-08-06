"use client";
import { usePathname } from "next/navigation";

import { Link } from "@nextui-org/link";

import type { FC } from "react";

interface NavLinkProps {
  href: string;
  name: string;
}

const NavLink: FC<NavLinkProps> = ({ href, name }) => {
  const path = usePathname();
  const navLinkClasses = `font-normal hover:text-focus transition-all ease-in-out duration-500 ${
    path === href ? " text-focus font-bold" : "text-foreground "
  }`;

  return <Link className={navLinkClasses} href={href}>
    {name}
  </Link>;
};

export default NavLink;
