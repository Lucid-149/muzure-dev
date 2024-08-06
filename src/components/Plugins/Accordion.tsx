import { Accordion, AccordionItem } from "@nextui-org/accordion";

import type { FC } from "react";

interface AccordionComponentProps {
  items: Array<{ title: string; children?: React.ReactNode }>;
}

const AccordionComponent: FC<AccordionComponentProps> = ({ items }) => {
  return (
    <Accordion>
      {items.map(({ title, children }, index) => (
        <AccordionItem key={index} name={title}>
          {children && <div>{children}</div>}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionComponent;
