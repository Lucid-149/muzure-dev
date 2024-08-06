"use client";
import { useEffect, useState } from "react";
import { Link } from "@nextui-org/link";
import type { FC } from "react";
import { KEIcon, Logo } from "./icons";
import { ThemeSwitch } from "./ThemeSwitch";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import {
  AtSign,
  CalendarCheck,
  Compass,
  Home,
  MapPinned,
  Menu,
} from "lucide-react";
import NavLink from "./NavLink";
const Nav: FC = () => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const path = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      setScrollDirection(
        currentScrollPosition > prevScrollPosition ? "down" : "up"
      );

      setScrolling(currentScrollPosition > 50);

      setPrevScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPosition]);

  const navClasses = `fixed top-0 left-0 z-[100] right-0 backdrop-blur-md bg-background/70 flex p-2 transition-all duration-300`;
  const translateY =
    scrollDirection === "down" ? "-translate-y-full" : "translate-y-0";

  return (
    <nav
      className={`${navClasses} ${translateY} justify-between items-center px-[5vw] `}
    >
      <Link
        href="/"
        className=" drop-shadow-xl hover:drop-shadow-none transition-all ease-in-out duration-500 leading-none text-foreground items-center gap-2 text-xl uppercase font-black flex"
      >
        <Logo />
        <div>
          <span className=" flex-col flex leading-none">
            Muzure
            <span className=" text-focus text-sm font-normal tracking-[0.7rem]">
              Travel
            </span>
          </span>
        </div>
      </Link>
      <ul className="md:flex hidden gap-6 flex-wrap justify-end items-center list-none">
        <li className="text-xl font-bold  text-foreground flex justify-center items-center">
          <NavLink href="/about" name="About Us" />
        </li>
        <li className="text-xl font-bold  text-foreground flex justify-center items-center">
          <NavLink href="/tours" name="Our Tours" />
        </li>
        <li className="text-xl font-bold  text-foreground flex justify-center items-center">
          <NavLink href="/destinations" name="Destinations" />
        </li>

        <li className="text-xl font-bold  text-foreground flex justify-center items-center">
          <ThemeSwitch />
        </li>
        <li className="text-xl font-bold  text-foreground flex justify-center items-center">
          <Button
            className=" uppercase font-bold flex justify-center items-center"
            as={Link}
            href="/contact"
            color="warning"
            variant="shadow"
          >
            Contact Us
          </Button>
        </li>
      </ul>
      <div className=" md:hidden flex items-center gap-5">
        <ThemeSwitch />
        <Dropdown
          backdrop={"blur"}
          className=" bg-background w-full "
          size="lg"
        >
          <DropdownTrigger>
            <Button className=" bg-background/0" isIconOnly>
              <Menu />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Navigation" className=" w-full">
            <DropdownItem key="about">
              <NavLink href="/" name="Home" />
            </DropdownItem>
            <DropdownItem key="about">
              <NavLink href="/about" name="About Us" />
            </DropdownItem>
            <DropdownItem key="tours">
              <NavLink href="/tours" name="Our Tours" />
            </DropdownItem>
            <DropdownItem key="destinations">
              <NavLink href="/destinations" name="Destinations" />
            </DropdownItem>
            <DropdownItem
              href="/contact"
              color="warning"
              variant="shadow"
              className=" text-lg font-bold"
              key="contact"
            >
              Contact Us
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Nav;
