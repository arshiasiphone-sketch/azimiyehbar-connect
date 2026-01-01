import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, addMonths, subMonths, setMonth, setYear, getMonth, getYear } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type JalaliCalendarProps = React.ComponentProps<typeof DayPicker>;

const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const persianWeekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function JalaliCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: JalaliCalendarProps) {
  const [displayMonth, setDisplayMonth] = React.useState(
    props.selected instanceof Date ? props.selected : new Date()
  );

  const jalaliMonth = getMonth(displayMonth);
  const jalaliYear = getYear(displayMonth);

  const handlePrevMonth = () => {
    setDisplayMonth(subMonths(displayMonth, 1));
  };

  const handleNextMonth = () => {
    setDisplayMonth(addMonths(displayMonth, 1));
  };

  const formatDay = (date: Date) => {
    return format(date, "d", { locale: faIR });
  };

  return (
    <div className={cn("p-3 pointer-events-auto", className)} dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handleNextMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
          aria-label="ماه بعد"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium persian-nums">
          {persianMonths[jalaliMonth]} {jalaliYear}
        </div>
        <button
          type="button"
          onClick={handlePrevMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
          aria-label="ماه قبل"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {persianWeekDays.map((day) => (
          <div
            key={day}
            className="h-9 w-9 text-center text-muted-foreground text-[0.8rem] font-normal flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid using DayPicker */}
      <DayPicker
        showOutsideDays={showOutsideDays}
        month={displayMonth}
        onMonthChange={setDisplayMonth}
        locale={faIR}
        dir="rtl"
        weekStartsOn={6}
        className="!p-0"
        classNames={{
          months: "flex flex-col",
          month: "space-y-0",
          caption: "hidden",
          nav: "hidden",
          table: "w-full border-collapse",
          head_row: "hidden",
          head_cell: "hidden",
          row: "flex w-full mt-1",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 persian-nums"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        formatters={{
          formatDay,
        }}
        {...props}
      />
    </div>
  );
}

JalaliCalendar.displayName = "JalaliCalendar";

export { JalaliCalendar };
