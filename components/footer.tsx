"use client";
import React, { useState } from "react";
import logo from "../public/assets/Logo Gold.png";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { showErrorToast, showSucessToast } from "@/utils/toasts";
import axios from "axios";

const Footer = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [message, setMessage] = useState("");
  const footerNavLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handelFeedbackSubmit = async () => {
    try {
      const req = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/feedbacks`,
        {},
        {
          params: {
            message: message,
            userId: user?.id,
          },
        }
      );
      console.log(req.status);
      if (req.status === 200) {
        setMessage("");
        showSucessToast("Feedback submitted");
      }
    } catch (error) {
      setMessage("");
      showErrorToast("you already have submitted feedback");
    }
  };

  return (
    <footer className="bg-black p-4 flex flex-col gap-2">
      <section className="flex flex-wrap gap-4 md:gap-8 justify-center items-center px-4">
        {footerNavLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-gray-500 hover:text-white font-light text-lg"
          >
            {item.label}
          </Link>
        ))}
      </section>
      <Separator className="bg-gray-500 mb-6" />
      <section className="flex justify-center items-center">
      <div className="flex items-center md:justify-center gap-4 px-8 md:w-1/2">
          <Image
            alt="illusion-logo"
            src={logo}
            width={150}
            height={150}
            className="object-cover pointer-events-none"
          />
        </div>
        <div className="hidden md:flex flex-col items-start justify-center gap-2 w-1/2">
          <p className="text-white font-semibold">{`Share Your Feedback`}</p>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="let us know how was your experience buying from us"
            className="bg-transparent text-white border-slate-600"
          />
          <Button
            variant="outline"
            className="w-full bg-transparent text-white border-slate-600"
            onClick={() => {
              if (!message) {
                showErrorToast("Please enter your feedback");
              } else if (!user) {
                showErrorToast("Please login to submit feedback");
              } else {
                handelFeedbackSubmit();
              }
            }}
          >
            Submit
          </Button>
        </div>

        
      </section>
    </footer>
  );
};

export default Footer;
