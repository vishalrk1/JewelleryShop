import React from "react";
import logo from "../public/assets/Logo Gold.png";
import Image from "next/image";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-slate-900 p-4 flex flex-col gap-2">
      <section className="flex justify-between items-center">
        <div className="flex flex-col gap-10 p-6 w-1/2">
          <Image
            alt="illusion-logo"
            src={logo}
            width={70}
            height={70}
            className="object-cover"
          />
          <p className="text-white">
            Discover our exquisite collection of handcrafted jewelry.
          </p>
        </div>
        <div className="flex flex-col items-start justify-center gap-2 w-1/2">
          <p className="text-white font-semibold">{`Share Your Feedback`}</p>
          <Textarea className="bg-transparent text-white border-slate-600" />
          <Button
            variant="outline"
            className="w-full bg-transparent text-white border-slate-600"
          >
            Submit
          </Button>
        </div>
      </section>
      <section className="flex">
        <div className="bg-white flex-1 flex justify-center items-center">
          1
        </div>
        <div className="flex-1 flex justify-center items-center">2</div>
        <div className="bg-white flex-1 flex justify-center items-center">
          3
        </div>
      </section>
    </footer>
  );
};

export default Footer;

// lol

