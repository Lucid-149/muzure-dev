import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Link } from "@nextui-org/link";
import { ChevronRight } from "lucide-react";
import type { FC } from "react";

interface BreadcrumbsProps {
  items: Array<{ label: string; href: string }>;
}

const BreadCrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div>
      {items.map((item, i) => (
        <Link className=" text-foreground" key={i} href={item.href}>
          {item.label}{" "}
          <ChevronRight
            className={i + 1 === items.length ? "hidden" : "flex"}
          />
        </Link>
      ))}
    </div>
  );
};

export default BreadCrumbs;
