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
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const NewUserDetailsSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  image: z.string().url().optional(),
  phone: z.string().optional(),
});

export const AddressDetailsSchema = z.object({
  address_type: z.string().min(1, { message: "Address type is required" }),
  address_line1: z.string().min(1, { message: "Address line 1 is required" }),
  address_line2: z.string().min(1, { message: "Address line 2 is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  postal_code: z.string().min(1, { message: "Postal code is required" }),
});

const combinedSchema = z.intersection(
  NewUserDetailsSchema,
  z.object({
    address: AddressDetailsSchema.optional(),
  })
);

type FormData = z.infer<typeof combinedSchema>;

const UpdateProfileDetailsPage: React.FC = () => {
  const router = useRouter();
  const { user, updateUser, isProfileComplete, fetching } = useUserStore();
  const [profileImage, setProfileImage] = useState<string>(NoUserImage.src);
  const [userPfpFile, setUserPfpFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addressTypes = [
    { label: "Home", value: "Home" },
    { label: "Work", value: "Work" },
    { label: "Other", value: "Other" },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(NewUserDetailsSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      image: NoUserImage.src,
      phone: "",
      address: undefined,
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
        address:
          user?.addresses[0] ||
          (!isProfileComplete
            ? {
                address_line1: "",
                address_line2: "",
                city: "",
                state: "",
                country: "",
                postal_code: "",
                address_type: "",
              }
            : undefined),
      });
      setProfileImage(user.image || NoUserImage.src);
    }
  }, [user, form, isProfileComplete]);

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
    <main className="min-h-screen h-full px-8 flex w-full gap-10 mb-4">
      <section className="w-1/3 flex flex-col items-center justify-start">
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
      <section className="px-6 h-full w-full flex flex-col">
        {!fetching && (
          <div className="w-full px-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <h1 className="text-2xl font-semibold mb-2 text-left">
                  {isProfileComplete
                    ? "Update Your Profile Details"
                    : "Complete Your Profile"}
                </h1>
                <Separator className="mb-6" />
                <div className="grid grid-cols-2 gap-4 gap-y-6">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="my-0 text-base">Email</FormLabel>
                        <FormControl>
                          <Input type="email" className="w-full" {...field} />
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
                {!isProfileComplete && !fetching && (
                  <>
                    <h1 className="text-2xl font-semibold mt-12 mb-2 text-left">
                      Add Primary Address
                    </h1>
                    <Separator className="mb-6" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-6">
                      <FormField
                        name="address.address_line1"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="my-0 text-base">
                              Address Line 1
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Address Line 1"
                                className="w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="address.address_line2"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="my-0 text-base">
                              Address Line 2
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Address Line 2"
                                className="w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="address.city"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="my-0 text-base">
                              City
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="City"
                                className="w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="address.state"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="my-0 text-base">
                              State
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="State"
                                className="w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="address.postal_code"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="my-0 text-base">
                              Zip Code
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="6 digit Zip Code"
                                className="w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="address.country"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="my-0 text-base">
                              Country
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Country"
                                className="w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="address.address_type"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="my-0 text-base">
                              Address Type
                            </FormLabel>
                            <FormControl>
                              <Select
                                defaultValue={field.value}
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={addressTypes[0].label}
                                    />
                                    <SelectContent>
                                      {addressTypes.map(
                                        (option: any, index: number) => {
                                          return (
                                            <SelectItem
                                              value={option.value}
                                              key={index}
                                            >
                                              {option.label}
                                            </SelectItem>
                                          );
                                        }
                                      )}
                                    </SelectContent>
                                  </SelectTrigger>
                                </FormControl>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                <div className="flex flex-row items-center justify-end p-3 my-3">
                  <Button type="submit" className="w-1/3">
                    {isProfileComplete ? "Update Profile" : "Complete Profile"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </section>
    </main>
  );
};

export default UpdateProfileDetailsPage;
