"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Edit } from "lucide-react";
import useUserStore from "@/hooks/useUserStore";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import NoUserImage from "../../../../public/assets/NoUserImage.jpg"; // Assume this exists
import { useParams, useRouter } from "next/navigation";

export const NewUserDetailsSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  image: z.string().url().optional(),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof NewUserDetailsSchema>;

const UpdateProfileDetailsPage: React.FC = () => {
  const router = useRouter();
  const { user, updateUser, isProfileComplete } = useUserStore();
  const [profileImage, setProfileImage] = useState<string>(NoUserImage.src);
  const [userPfpFile, setUserPfpFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(NewUserDetailsSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      image: NoUserImage.src,
      phone: "",
    },
    mode: "onSubmit", // Changed from 'onChange' to 'onSubmit'
  });

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        image: user.image || NoUserImage.src,
        phone: user.phone || "",
      });
      setProfileImage(user.image || NoUserImage.src);
    }
  }, [user, form]);

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserPfpFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(reader.result as string);
          form.setValue("image", reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted with data:", data); // Debug log
    try {
      updateUser(data)
        .then(() => {
          router.replace(isProfileComplete ? "/profile" : "/");
        })
        .catch((error) => {
          console.error("Failed to update profile:", error);
        });
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <main className="min-h-screen px-8 flex items-center justify-center w-full h-screen gap-10 mb-4">
      <section className="h-full w-1/3 flex flex-col items-center justify-start">
        <div className="flex flex-col items-center gap-4">
          <Avatar>
            <AvatarImage
              src={form.getValues("image") || profileImage}
              alt="Profile"
              className="rounded-full object-cover pointer-events-none"
            />
          </Avatar>
          <Button
            onClick={handleEditClick}
            className="w-1/2 text-base flex items-center"
          >
            <Edit className="mr-4" />
            Edit
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleImageInput}
            accept="image/*"
          />
        </div>
      </section>
      <section className="px-6 h-full w-full flex flex-col items-center justify-start">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="grid grid-cols-2 gap-4 gap-y-6">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="my-0 text-base">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="w-full"
                          disabled
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="my-0 text-base">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="first_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="my-0 text-base">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="last_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="my-0 text-base">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row items-center justify-end p-3 my-3">
                <Button type="submit" className="w-1/3">
                  {isProfileComplete ? "Update Profile" : "Complete Profile"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default UpdateProfileDetailsPage;
