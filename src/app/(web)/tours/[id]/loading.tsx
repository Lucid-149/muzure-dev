import { Logo } from "@/components/Layout/icons";
import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <main className=" w-screen h-screen grid place-content-center ">
      <div className=" flex">
        <Logo size={100} />
        <div className=" p-5 max-w-sm">
          <Loader2 className=" animate-spinner-ease-spin" size={50} />
          <p className=" text-lg mt-6">Your Journey Starts with Muzure</p>
        </div>
      </div>
    </main>
  );
}
