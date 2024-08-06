  import {
    Autocomplete,
    AutocompleteSection,
    AutocompleteItem,
  } from "@nextui-org/autocomplete";
  import { Image } from "@nextui-org/image";

  import type { FC } from "react";

  interface SelectElementProps {
    label?: string;
    value?: string;
    onChange: (value: any) => void;
    options: {
      value: string | number;
      key: string;
      name: string;
    }[];
  }

  const SelectElement: FC<SelectElementProps> = ({label,value,onChange,options}) => {
    return (
      <Autocomplete variant="underlined" onChange={onChange} className="max-w-xs" label={label} value={value} defaultItems={options}>
        {(item)=><AutocompleteItem   key={item.key} value={item.value}>{item.name}</AutocompleteItem>}
      </Autocomplete>
    );
  };

  export default SelectElement;
