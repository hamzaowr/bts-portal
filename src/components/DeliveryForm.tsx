import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RiInformation2Line } from "react-icons/ri";
import { BsCreditCard2Front } from "react-icons/bs";
import { MdOutlinePlace } from "react-icons/md";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "./ui/input";
import {  useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FormDateSelector } from "./FormDatePicker";
import { loadFromStorage, saveToLocalStorage } from "@/lib/storage";
import { useCart } from "@/context/use-cart";
import type { FileFieldProps } from "@/lib/definitions";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

const FRONTEND_URL = import.meta.env.VITE_SITE_URL || "http://localhost:3000";

const DATES_KEY = "rental-dates";

const formSchema = z.object({
  name: z.string().min(2).max(64),
  surname: z.string().max(64).optional(),
  email: z.string().email().min(6).max(32),
  phone: z.string().min(7).max(13),
  consultant_name: z.string().min(3).max(64),
  bts_office: z.string().min(1).max(32),
  project_reference: z.string().min(1).max(8),
  event_start_date: z.string(),
  event_end_date: z.string().optional(),
  delivery_contact: z.string().min(2).max(64),
  delivery_phone: z.string().min(7).max(13),
  delivery_email: z.string().email().min(6).max(32),
  address: z.string().min(3),
  state: z.string().min(1),
  zipcode: z.string().min(6).max(10),
  country: z.string().min(1),
  instructions: z.string().optional(),
  config_file: z.instanceof(File).optional(),
});

type DeliveryFormValues = z.infer<typeof formSchema>;

const countries = ["United States of America"];

const states = [
  { name: "Alabama", value: "AL" },
  { name: "Arizona", value: "AZ" },
  { name: "Arkansas", value: "AR" },
  { name: "California", value: "CA" },
  { name: "Colorado", value: "CO" },
  { name: "Connecticut", value: "CT" },
  { name: "Delaware", value: "DE" },
  { name: "District of Columbia", value: "DC" },
  { name: "Florida", value: "FL" },
  { name: "Georgia", value: "GA" },
  { name: "Idaho", value: "ID" },
  { name: "Illinois", value: "IL" },
  { name: "Indiana", value: "IN" },
  { name: "Iowa", value: "IA" },
  { name: "Kansas", value: "KS" },
  { name: "Kentucky", value: "KY" },
  { name: "Louisiana", value: "LA" },
  { name: "Maine", value: "ME" },
  { name: "Maryland", value: "MD" },
  { name: "Massachusetts", value: "MA" },
  { name: "Michigan", value: "MI" },
  { name: "Minnesota", value: "MN" },
  { name: "Mississippi", value: "MS" },
  { name: "Missouri", value: "MO" },
  { name: "Montana", value: "MT" },
  { name: "Nebraska", value: "NE" },
  { name: "Nevada", value: "NV" },
  { name: "New Hampshire", value: "NH" },
  { name: "New Jersey", value: "NJ" },
  { name: "New Mexico", value: "NM" },
  { name: "New York", value: "NY" },
  { name: "North Carolina", value: "NC" },
  { name: "North Dakota", value: "ND" },
  { name: "Ohio", value: "OH" },
  { name: "Oklahoma", value: "OK" },
  { name: "Oregon", value: "OR" },
  { name: "Pennsylvania", value: "PA" },
  { name: "Rhode Island", value: "RI" },
  { name: "South Carolina", value: "SC" },
  { name: "South Dakota", value: "SD" },
  { name: "Tennessee", value: "TN" },
  { name: "Texas", value: "TX" },
  { name: "Utah", value: "UT" },
  { name: "Vermont", value: "VT" },
  { name: "Virginia", value: "VA" },
  { name: "Washington", value: "WA" },
  { name: "West Virginia", value: "WV" },
  { name: "Wisconsin", value: "WI" },
  { name: "Wyoming", value: "WY" },
];


const TextField: React.FC<{
  form: any;
  name: keyof DeliveryFormValues;
  label: string;
  required?: boolean;
  className?: string;
  type?: string;
  placeholder?: string;
}> = ({ form, name, label, required, className, ...props }) => (
  <form.Field
    name={name}
    children={(field: any) => {
      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
      return (
        <Field data-invalid={isInvalid} className={className}>
          <FieldLabel htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
          </FieldLabel>
          <Input
            id={name}
            name={name}
            value={field.state.value ?? ""}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            aria-invalid={isInvalid}
            {...props}
            required={required}
          />
          {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
      );
    }}
  />
);


const FileField: React.FC<
  FileFieldProps & {
    form: any;
  }
> = ({ form, name, label, required }) => (
  <form.Field
    name={name}
    children={(field: any) => {
      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
      return (
        <Field data-invalid={isInvalid}>
          <FieldLabel htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
          </FieldLabel>
          <Input
            id={name}
            type="file"
            name={name}
            onBlur={field.handleBlur}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0] ?? undefined;
              field.handleChange(file);
            }}
            aria-invalid={isInvalid}
          />
          {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
      );
    }}
  />
);

const DeliveryForm: React.FC = () => {
  const { items: rawItems, setSelectedState } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const items = rawItems.map((i) => ({
    ...i,
    imageUrl: i.imageUrl.startsWith("http")
      ? i.imageUrl
      : `${FRONTEND_URL}${i.imageUrl}`,
  }));

  const savedDates = loadFromStorage<{ startDate?: string; endDate?: string }>(
    DATES_KEY,
    {},
  );

  const form = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      consultant_name: "",
      bts_office: "",
      project_reference: "",
      event_start_date: savedDates.startDate || new Date().toISOString(),
      event_end_date: savedDates.endDate || new Date().toISOString(),
      delivery_contact: "",
      delivery_phone: "",
      delivery_email: "",
      address: "",
      state: "",
      zipcode: "",
      country: "",
      instructions: "",
      config_file: undefined,
    } as DeliveryFormValues,
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => await handleFormSubmit(value),
  });

  const handleFormSubmit = async (values: DeliveryFormValues) => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Append all fields safely
      Object.entries(values).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (value instanceof File) formData.append(key, value);
        else formData.append(key, String(value));
      });

      // Append cart items
      formData.append("cart_items", JSON.stringify(items));

      const res = await fetch(`/api/send-email`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) return toast.error("Failed to send request");

      saveToLocalStorage("rental-user", {
        name: values.name,
        email: values.email,
        phone: values.phone,
        rental_start_date: values.event_start_date,
        rental_end_date: values.event_end_date,
      });

      setSelectedState("");
      form.reset();

      navigate({ to: "/success" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  // Save dates in localStorage whenever they change
  useEffect(() => {
    saveToLocalStorage(DATES_KEY, {
      startDate: form.getFieldValue("event_start_date"),
      endDate: form.getFieldValue("event_end_date"),
    });
  }, [form]);

  return (
    <Card className="bg-white py-8 px-4 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-pink-500 font-bold">
          <RiInformation2Line /> Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="delivery-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(e);
          }}
        >
          <FieldGroup className="gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <TextField
                form={form}
                name="name"
                label="Full name"
                required
                placeholder="John Doe"
              />
              <TextField
                form={form}
                name="surname"
                label="Surname"
                placeholder="Doe"
              />
              <TextField
                form={form}
                name="email"
                label="Email"
                type="email"
                required
                placeholder="john@bts.com"
              />
              <TextField
                form={form}
                name="phone"
                label="Phone"
                type="tel"
                required
                placeholder="+971-123-45678-9"
              />
              <TextField
                form={form}
                name="consultant_name"
                label="Consultant Name"
                required
                placeholder="John Doe"
              />
              <TextField
                form={form}
                name="bts_office"
                label="BTS Office"
                required
                placeholder="e.g. London"
              />
            </div>

            <TextField
              form={form}
              name="project_reference"
              label="Project Reference"
              required
              placeholder="BTS123456"
            />

            <FormDateSelector
              startDateValue={form.getFieldValue("event_start_date")}
              endDateValue={form.getFieldValue("event_end_date")}
              onStartChange={(iso) =>
                form.setFieldValue("event_start_date", iso)
              }
              onEndChange={(iso) => form.setFieldValue("event_end_date", iso)}
            />

            <FileField
              form={form}
              name="config_file"
              label="Upload Configuration"
              required={false}
            />

            <Card className="mt-4 p-0 shadow-none border-none">
              <CardTitle className="flex items-center gap-2 text-pink-500 font-bold">
                <MdOutlinePlace />
                Delivery Information
              </CardTitle>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <TextField
                form={form}
                name="delivery_contact"
                label="Delivery Contact Name"
                required
                placeholder="John Doe"
              />
              <TextField
                form={form}
                name="delivery_email"
                label="Delivery Email"
                type="email"
                required
                placeholder="john@bts.com"
              />
              <TextField
                form={form}
                name="delivery_phone"
                label="Delivery Phone"
                type="tel"
                required
                placeholder="+971-123-45678-9"
              />
              <TextField
                form={form}
                name="zipcode"
                label="Zip Code"
                required
                placeholder="90210"
              />
              <TextField
                form={form}
                name="address"
                label="Address"
                required
                className="md:col-span-2"
                placeholder="3 Raven Road, London"
              />

              <form.Field name="country">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Country <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger
                          id="country-select"
                          aria-invalid={isInvalid}
                        >
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="state">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        State <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={(value) => {
                          field.handleChange(value);
                          setSelectedState(value);
                        }}
                      >
                        <SelectTrigger
                          id="state-select"
                          aria-invalid={isInvalid}
                        >
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>
            <form.Field name="instructions">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Instructions</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value ?? ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your instructions (if any)"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form="delivery-form"
          disabled={loading}
          className="w-full px-12 py-6 flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-pink-500 cursor-pointer"
        >
          {loading ? (
            <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <BsCreditCard2Front />
          )}
          {loading ? "Submitting..." : "Proceed to Payment"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeliveryForm;
