"use client";

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
import { Button } from "./ui/button";
import { loadFromStorage, saveToLocalStorage } from "@/lib/storage";

const DATES_KEY = "rental-dates";

type RentalDates = {
  startDate?: string;
  endDate?: string;
};

const DatesSelector = () => {
  function formatDate(date: Date | undefined) {
    if (!date) return "";

    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function isValidDate(date: Date | undefined) {
    if (!date) {
      return false;
    }
    return !isNaN(date.getTime());
  }
  const [startOpen, setStartOpen] = React.useState(false);
  const [endOpen, setEndOpen] = React.useState(false);

  const [startDate, setStartDate] = React.useState<Date | undefined>(
    new Date(),
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>();

  const [startMonth, setStartMonth] = React.useState<Date | undefined>(
    new Date(),
  );
  const [endMonth, setEndMonth] = React.useState<Date | undefined>();

  const [startValue, setStartValue] = React.useState(formatDate(startDate));
  const [endValue, setEndValue] = React.useState("");

  const [dates, setDates] = React.useState<RentalDates>(() =>
    loadFromStorage<RentalDates>(DATES_KEY, {}),
  );

  const today = new Date();

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

  React.useEffect(() => {
    saveToLocalStorage(DATES_KEY, dates);
  }, [dates]);

  return (
    <section className="container mx-auto space-y-8">
      <div className="flex items-center justify-center gap-16 max-w-2xl mx-auto">
        <Field>
          <FieldLabel
            htmlFor="rental-start"
            className="flex items-center gap-2"
          >
            <IoCalendarNumberOutline className="text-pink-600" size={18} />
            Rental Start Date
          </FieldLabel>

          <InputGroup className="bg-white">
            <InputGroupInput
              id="rental-start"
              value={startValue}
              placeholder="Pick a date"
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
                <PopoverTrigger asChild className="cursor-pointer">
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

                      setDates((prev) => ({
                        ...prev,
                        startDate: date.toISOString(),
                      }));

                      // auto open end picker
                      setEndMonth(date);
                      setEndOpen(true);

                      if (endDate && endDate < date) {
                        setEndDate(undefined);
                        setEndValue("");
                        setDates((p) => ({ ...p, endDate: undefined }));
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel htmlFor="rental-end" className="flex items-center gap-2">
            <IoCalendarNumberOutline className="text-pink-600" size={18} />
            Rental End Date
          </FieldLabel>

          <InputGroup className="bg-white">
            <InputGroupInput
              id="rental-end"
              value={endValue}
              placeholder="Pick a date"
              onChange={(e) => {
                setEndValue(e.target.value);
                const date = new Date(e.target.value);

                if (!isValidDate(date)) return;

                if (startDate && date < startDate) {
                  return;
                }

                setEndDate(date);
                setEndMonth(date);
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
                <PopoverTrigger asChild className="cursor-pointer">
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
                    disabled={(date) => (startDate ? date < startDate : false)}
                    onSelect={(date) => {
                      if (!date) return;

                      if (startDate && date < startDate) return;

                      setEndDate(date);
                      setEndValue(formatDate(date));
                      setEndOpen(false);

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

      {/* <Card className="flex flex-row items-start gap-6 mx-auto max-w-3xl p-8 border-pink-300 bg-pink-100">
        <div className="bg-pink-200 rounded-full p-2">
          <LuTruck size={20} className="text-bts-pink" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <FaRegClock className="text-bts-pink" />

            <h5 className="text-bts-pink font-medium">Delivery Information</h5>
          </div>

          <p className="text-bts-pink">
            Equipment delivery arrives a minimum of 2 days before your rental
            start date and is collected 2 days after your rental end date to
            ensure everything is ready for your event.
          </p>
        </div>
      </Card> */}

      <div className="flex flex-col gap-2 items-center">
        <Button
          disabled={!startDate || !endDate}
          className="px-12 cursor-pointer bg-linear-to-r from-bts-pink to-owr-blue"
          onClick={() => {
            if (!startDate || !endDate) {
              setStartOpen(true);
              setEndOpen(false);
              return;
            }
          }}
          asChild
        >
          <a href="#bundles">Continue Rental Inquiry</a>
        </Button>
        {!startDate ||
          (!endDate && (
            <span>Please select both rental dates to continue</span>
          ))}
      </div>
    </section>
  );
};

export default DatesSelector;
