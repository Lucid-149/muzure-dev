import { Button } from "@nextui-org/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import DatePicker, {
  ReactDatePickerProps,
  ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import "@/styles/date-picker.css";

interface CustomDatePickerProps {
  field?: {
    value: Date;
    onChange: (date: Date | null) => void;
  };
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ field }) => {
  const renderCustomHeader = (params: ReactDatePickerCustomHeaderProps) => (
    <div className="flex flex-col w-full bg-background ">
      <div className="flex items-center justify-between">
        <Button
          variant="flat"
          className="rounded-l-none"
          onClick={() => params.changeYear(2024)}
        >
          2024
        </Button>
        <Button
          variant="flat"
          className="rounded-r-none"
          onClick={() => params.changeYear(2025)}
        >
          2025
        </Button>
      </div>
      <div className="flex items-center justify-between gap-3 p-1 ">
        <Button isIconOnly variant="flat" onClick={params.decreaseMonth}>
          <ChevronLeft />
        </Button>
        <p className="text-base font-semibold">
          {params.monthDate.toLocaleString("en-us", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
        <Button isIconOnly variant="flat" onClick={params.increaseMonth}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );

  const renderDayContents = (dayOfMonth: number, date?: Date) => (
    <div className="p-1 font-semibold transition-all duration-300 ease-in-out bg-transparent rounded-md hover:shadow-md hover:bg-background hover:-m-2 hover:text-focus">
      {dayOfMonth}
    </div>
  );

  const renderMonthContent = (
    monthIndex: number,
    shortMonthText: string,
    fullMonthText: string
  ) => (
    <div>
      {fullMonthText}
      {monthIndex}{" "}
    </div>
  );
if (field){
  return (
    <div className="flex items-center justify-start w-full h-full gap-4 p-1 border-b-2 hover:border-foreground border-foreground/30">
    
      <DatePicker
        className="z-30 w-full py-1 text-base bg-transparent border-none rounded-md outline-none text-foreground"
        popperContainer={(popperProps: { children: React.ReactNode[] }) => (
          <div className="">{popperProps.children}</div>
        )}
        wrapperClassName="w-full"
        popperPlacement={"bottom"}
        popperClassName="border-foreground/20  border z-50 bg-background shadow-2xl rounded-md "
        dateFormat="MMMM d, yyyy"
        weekLabel="text-secondary/50"
        maxDate={new Date(Date.now() + 500 * 24 * 60 * 60 * 1000)}
        minDate={new Date()}
        onChange={(date) => field.onChange(date)}
        selected={field.value}
        renderCustomHeader={renderCustomHeader}
        renderDayContents={renderDayContents}
        renderMonthContent={renderMonthContent}
      />
    </div>
  );

}
return null
};

export default CustomDatePicker;