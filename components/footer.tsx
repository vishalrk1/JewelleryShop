"use client";
import React, { useState } from "react";
import logo from "../public/assets/Logo Gold.png";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { showErrorToast } from "@/utils/toasts";
import axios from "axios";
import useUserStore from "@/hooks/useUserStore";
import useAuthStore from "@/hooks/useAuthStore";
import useFeedbackStore from "@/hooks/useFeedbackStore";
import Loader from "./Loader";

const Footer = () => {
  const { user } = useUserStore();
  const { token } = useAuthStore();
  const { fetching, addFeedback } = useFeedbackStore();
  const [message, setMessage] = useState("");
  const footerNavLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handelSubmitFeedback = () => {
    if (!user || !token) {
      showErrorToast("Please login to submit feedback");
    } else {
      addFeedback(message, token).then((data)=>{
        if(data) {
          setMessage("");
        }
      });
    }
  };

  return (
    <footer className="bg-black p-4 flex flex-col gap-2">
      <section className="flex flex-wrap gap-4 md:gap-8 justify-center items-center px-4">
        {footerNavLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-gray-500 hover:text-white font-light text-lg hover:-translate-y-0.5 transition-all duration-200"
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
              } else {
                handelSubmitFeedback();
              }
            }}
            disabled={fetching}
          >
            {fetching && (
              <Loader
                className="w-4 h-4 border-2 mx-2"
                color="border-gray-100"
              />
            )}
            Submit
          </Button>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
