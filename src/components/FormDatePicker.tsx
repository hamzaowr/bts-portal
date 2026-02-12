import React from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Field, FieldLabel } from "./ui/field";
import { loadFromStorage, saveToLocalStorage } from "@/lib/storage";

const DATES_KEY = "rental-dates";

type RentalDates = {
  startDate?: string;
  endDate?: string;
};

type Props = {
  startDateValue?: string;
  endDateValue?: string;
  onStartChange: (iso: string) => void;
  onEndChange: (iso: string) => void;
};

export function FormDateSelector({
  startDateValue,
  endDateValue,
  onStartChange,
  onEndChange,
}: Props) {
  function formatDate(date: Date | undefined) {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function isValidDate(date: Date | undefined) {
    return date instanceof Date && !isNaN(date.getTime());
  }

  const today = new Date();

  const [startDate, setStartDate] = React.useState<Date>(
    startDateValue ? new Date(startDateValue) : today,
  );
  const [endDate, setEndDate] = React.useState<Date>(
    endDateValue
      ? new Date(endDateValue)
      : new Date(today.getTime() + 24 * 60 * 60 * 1000),
  );

  const [startOpen, setStartOpen] = React.useState(false);
  const [endOpen, setEndOpen] = React.useState(false);

  const [startMonth, setStartMonth] = React.useState<Date>(startDate);
  const [endMonth, setEndMonth] = React.useState<Date>(endDate);

  const [startValue, setStartValue] = React.useState(formatDate(startDate));
  const [endValue, setEndValue] = React.useState(formatDate(endDate));

  const [dates, setDates] = React.useState<RentalDates>(() =>
    loadFromStorage<RentalDates>(DATES_KEY, {}),
  );

  // Load dates from localStorage
  React.useEffect(() => {
    if (dates.startDate) {
      const d = new Date(dates.startDate);
      setStartDate(d);
      setStartMonth(d);
      setStartValue(formatDate(d));
    }
    if (dates.endDate) {
      const d = new Date(dates.endDate);
      setEndDate(d);
      setEndMonth(d);
      setEndValue(formatDate(d));
    }
  }, [dates.startDate, dates.endDate]);

  // Save to localStorage whenever changed
  React.useEffect(() => {
    saveToLocalStorage(DATES_KEY, dates);
  }, [dates]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Start Date */}
      <Field>
        <FieldLabel htmlFor="form-start-date">
          Rental Start Date <span className="text-red-500">*</span>
        </FieldLabel>
        <InputGroup className="bg-white">
          <InputGroupInput
            id="form-start-date"
            value={startValue}
            placeholder="Pick a date"
            required
            onChange={(e) => {
              setStartValue(e.target.value);
              const date = new Date(e.target.value);
              if (isValidDate(date)) {
                setStartDate(date);
                setStartMonth(date);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setStartOpen(true);
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <Popover open={startOpen} onOpenChange={setStartOpen}>
              <PopoverTrigger asChild>
                <InputGroupButton size="icon-xs" variant="ghost">
                  <IoCalendarNumberOutline />
                </InputGroupButton>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={startDate}
                  month={startMonth}
                  onMonthChange={setStartMonth}
                  disabled={(d) => d < today}
                  onSelect={(date) => {
                    if (!date) return;
                    setStartDate(date);
                    setStartValue(formatDate(date));
                    setStartMonth(date);
                    setStartOpen(false);
                    onStartChange(date.toISOString());

                    setDates((prev) => ({
                      ...prev,
                      startDate: date.toISOString(),
                    }));

                    // auto-adjust end if it’s before start
                    if (!endDate || endDate < date) {
                      const newEnd = new Date(
                        date.getTime() + 24 * 60 * 60 * 1000,
                      );
                      setEndDate(newEnd);
                      setEndValue(formatDate(newEnd));
                      setEndMonth(newEnd);
                      onEndChange(newEnd.toISOString());
                      setDates((prev) => ({
                        ...prev,
                        endDate: newEnd.toISOString(),
                      }));
                    }

                    // auto-open end calendar
                    setEndOpen(true);
                    setEndMonth(date);
                  }}
                />
              </PopoverContent>
            </Popover>
          </InputGroupAddon>
        </InputGroup>
      </Field>

      {/* End Date */}
      <Field>
        <FieldLabel htmlFor="form-end-date">
          Rental End Date <span className="text-red-500">*</span>
        </FieldLabel>
        <InputGroup className="bg-white">
          <InputGroupInput
            id="form-end-date"
            value={endValue}
            placeholder="Pick a date"
            required
            onChange={(e) => {
              setEndValue(e.target.value);
              const date = new Date(e.target.value);
              if (!isValidDate(date)) return;
              if (date < startDate) return;
              setEndDate(date);
              setEndMonth(date);
              onEndChange(date.toISOString());
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setEndOpen(true);
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <Popover open={endOpen} onOpenChange={setEndOpen}>
              <PopoverTrigger asChild>
                <InputGroupButton size="icon-xs" variant="ghost">
                  <IoCalendarNumberOutline />
                </InputGroupButton>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={endDate}
                  month={endMonth}
                  onMonthChange={setEndMonth}
                  disabled={(d) => d < startDate}
                  onSelect={(date) => {
                    if (!date) return;
                    if (date < startDate) return;
                    setEndDate(date);
                    setEndValue(formatDate(date));
                    setEndOpen(false);
                    onEndChange(date.toISOString());
                    setDates((prev) => ({
                      ...prev,
                      endDate: date.toISOString(),
                    }));
                  }}
                />
              </PopoverContent>
            </Popover>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
}
