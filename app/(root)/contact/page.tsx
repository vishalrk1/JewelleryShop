"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  ChevronDownIcon,
  FacebookIcon,
  GlobeIcon,
  Heart,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  Phone,
  PhoneIcon,
  RefreshCcw,
  TwitterIcon,
} from "lucide-react";
import FaqCollapsible from "@/components/Collapsible/FaqCollapsible";
import { FAQQuestions } from "@/utils/dateUtils";
import Image from "next/image";

const ContactPage = () => {
  const contactData: {
    title: string;
    description: string;
    subTitle: string;
    icon: React.ReactNode;
  }[] = [
    {
      title: "Take care with love",
      description:
        "We take care your package with full of attention and of course full of love. We're located in the heart of the city, ready to serve you with our exquisite collection of jewelry.",
      subTitle:
        "123 Jewellery Lane, Gemstone Plaza, Bhopal, Madhya Pradesh 462001, India.",
      icon: <Heart color="white" size={32} fill="white" />,
    },
    {
      title: "Friendly Customer Service",
      description:
        "You do not need to worry when you want to check your package. We will always answer whatever your questions. Just click on the chat icon and we will talk.",
      subTitle: "Phone: +91 8208366272",
      icon: <Phone color="white" size={32} />,
    },
    {
      title: "Refund Process",
      description:
        "Refund is a such bad experience and we don’t want that thing happen to you. But when it’s happen we will make sure you will through smooth and friendly process.",
      subTitle: "Mail: karangalevr@gmail.com",
      icon: <RefreshCcw color="white" size={32} />,
    },
  ];
  return (
    <main className="bg-gradient-to-r from-[#f1f1f1] to-[#f9f9f9] dark:from-[#1a1a1a] dark:to-[#212121]">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Illusion Jewellery
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-[600px] mx-auto lg:mx-0">
                Discover the captivating world of our handcrafted illusion
                jewellery, where elegance and optical illusion converge to
                create a mesmerizing experience.
              </p>
              <div className="w-full gap-8 flex items-center">
                <Button>Visit Store</Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
              <Image
                alt="Jewellery 1"
                className="w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                height="500"
                src="https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/cat_image/bracelets-category.jpg"
                width="550"
                style={{ aspectRatio: "1 / 1" }}
              />
              <Image
                alt="Jewellery 2"
                className="w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                height="600"
                src="https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/cat_image/bracelets-category.jpg"
                width="450"
                style={{ aspectRatio: "1 / 1" }}
              />
              <Image
                alt="Jewellery 3"
                className="col-span-2 w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                height="200"
                src="https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/cat_image/bracelets-category.jpg"
                width="450"
                style={{ aspectRatio: "16 / 9" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Have a question or need assistance? Fill out the form below and
                our team will get back to you as soon as possible.
              </p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      type="text"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message
                  </Label>
                  <Textarea
                    className="mt-1 min-h-[120px]"
                    id="message"
                    placeholder="Enter your message"
                  />
                </div>
                <Button className="w-full" type="submit">
                  Send Message
                </Button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {FAQQuestions.map((item, index) => (
                  <FaqCollapsible
                    key={index}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-16">
        <h1 className="text-3xl font-bold tracking-tighter mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
          {contactData?.map((item) => (
            <div key={item.title} className="flex flex-col gap-1 items-start">
              <div className="bg-black rounded-full p-4 mb-2">{item.icon}</div>
              <p className="text-xl font-semibold">{item.title}</p>
              <p className="text-gray-500">{item.description}</p>
              <p className="text-gray-700 font-semibold">{item.subTitle}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
