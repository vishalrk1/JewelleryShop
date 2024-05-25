"use server";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  ChevronDownIcon,
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";
import FaqCollapsible from "@/components/Collapsible/FaqCollapsible";
import { FAQQuestions } from "@/utils/dateUtils";
import Image from "next/image";

const ContactPage = () => {
  return (
    <main>
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#f1f1f1] to-[#f9f9f9] dark:from-[#1a1a1a] dark:to-[#212121]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Illusion Jewellery
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover the captivating world of our handcrafted illusion
                  jewellery, where elegance and optical illusion converge to
                  create a mesmerizing experience.
                </p>
              </div>
            </div>
            <Image
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/cat_image/bracelets-category.jpg"
              width="550"
            />
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Get in Touch
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Have a question or need assistance? Fill out the form below and
                our team will get back to you as soon as possible.
              </p>
              <form className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <Label htmlFor="name" className="text-md">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      type="text"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-md">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message" className="text-md">
                    Message
                  </Label>
                  <Textarea
                    className="min-h-[120px]"
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 space-y-4">
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
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#f1f1f1] to-[#f9f9f9] dark:from-[#1a1a1a] dark:to-[#212121]">
        <div className="container px-4 md:px-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Get in touch with us for any inquiries or support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">Bhopal</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  +91 8208366282
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  illusionjewellery@gmail .com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GlobeIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  www.illusionjewellery.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FacebookIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div className="flex gap-2">
                  <Link
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="#"
                  >
                    <FacebookIcon className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="#"
                  >
                    <TwitterIcon className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href="#"
                  >
                    <InstagramIcon className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
