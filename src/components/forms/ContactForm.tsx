"use client";
import { useState, type FC, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Textarea } from "@nextui-org/input";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@nextui-org/button";
import { Loader2 } from "lucide-react";
import pb from "@/database";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  clientName: z.string().min(2).max(50),
  clientEmail: z.string().email(),
  subject: z.string(),
  message: z.string(),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
  service: z.string().optional(),
});

interface ContactFormProps {}

const ContactForm: FC<ContactFormProps> = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      subject: "",
      message: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const message = {
      name: data.clientName,
      email: data.clientEmail,
      subject: data.subject,
      message: data.message,
      phone_number: data.phoneNumber,
    };
    try {
      const record = await pb.collection("messages").create(message);
      form.reset();
      return record;
    } catch (error) {
      console.error(error);
    }
  };

  return form.formState.isSubmitting ? (
    <div className="flex flex-col items-center justify-center w-full h-full gap-10 py-20 ">
      <p>Submitting your booking</p> <Loader2 />{" "}
      <p>Please, do not leave this page.</p>
    </div>
  ) : (
    <form
      className="p-8 mx-5 flex flex-col rounded-lg shadow-2xl max-w-xl my-20 bg-background/80 backdrop-blur-lg z-0 w-full min-h-[600px] gap-2 justify-center items-center"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="p-5">
        <h1 className="text-xl font-bold">Get in touch with us!</h1>
        <p>
          We will respond as soon as possible. Please provide all required
          information so we can assist you.
        </p>
      </div>
      <div className="w-full max-w-md min-w-xs">
        <Input
          className=""
          classNames={{
            input: "sm: text-base rounded-md",
          }}
          label="Your Name"
          {...form.register("clientName")}
        />
        {form.formState.errors.clientName && <p>{form.formState.errors.clientName.message}</p>}
      </div>
      <div className="w-full max-w-md min-w-xs">
        <Input
          label="Your Email"
          className=""
          classNames={{
            input: "sm: text-base rounded-md",
          }}
          {...form.register("clientEmail")}
        />
        {form.formState.errors.clientEmail && <p>{form.formState.errors.clientEmail.message}</p>}
      </div>
      <div className="flex flex-col items-center justify-between w-full max-w-md gap-4 min-w-xs">
        <Input
          label="Your Phone Number"
          className="w-full"
          classNames={{
            input: "sm: text-base rounded-md",
          }}
          {...form.register("phoneNumber")}
        />
        {form.formState.errors.phoneNumber && <p>{form.formState.errors.phoneNumber.message}</p>}
      </div>
      <div className="w-full max-w-md min-w-xs">
        <Input
          label="Subject"
          className=""
          classNames={{
            input: "sm: text-base rounded-md",
          }}
          {...form.register("subject")}
        />
        {form.formState.errors.subject && <p>{form.formState.errors.subject.message}</p>}
      </div>
      <div className="w-full max-w-md min-w-xs">
        <Textarea
          rows={10}
          label="Message"
          className=""
          classNames={{
            input: "sm: text-base rounded-md",
            label: " sm:mb-6 ",
          }}
          {...form.register("message")}
        />
        {form.formState.errors.message && <p>{form.formState.errors.message.message}</p>}
      </div>
      <Button
        isDisabled={!form.watch("clientEmail")}
        type="submit"
        color={"secondary"}
        size={"lg"}
        className="w-full max-w-md font-semibold text-white uppercase"
      >
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
