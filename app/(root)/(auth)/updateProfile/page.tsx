"use client";
import Loader from "@/components/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/ui/Container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/redux/store/store";
import { UserDetailsFormFields, UserDetailsFormSchema } from "@/schemas";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import * as z from "zod";

const UpdateProfileDetailsPage = () => {
  const { user, fetching } = useSelector((state: RootState) => state.auth);

  const form = useForm<z.infer<typeof UserDetailsFormSchema>>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      first_name: "",
      last_name: "",
      user_gender: "",
      user_image_url: "",
      user_phone: "",
    },
  });

  useEffect(() => {
    if (!fetching) {
      console.log("user check");
      if (!user) return redirect("/register");
    }
  }, [user]);

  return (
    <>
      {!fetching ? (
        <div className="flex items-start">
          <Card className="md:w-screen max-w-md">
            <CardHeader>
              <CardTitle>Update Profile Details</CardTitle>
              <CardDescription>
                Update your profile details here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-2">
                  {UserDetailsFormFields.map((item) => {
                    return (
                      <>
                        <FormField
                          name={item.name}
                          render={({ field }) => (
                            <FormItem>
                              {!item.disabled && (
                                <FormLabel>{item.label}</FormLabel>
                              )}
                              <FormControl>
                                {item.options ? (
                                  <Select
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select you gender" />
                                        <SelectContent>
                                          {item.options.map((option) => {
                                            return (
                                              <SelectItem value={option.value}>
                                                {option.label}
                                              </SelectItem>
                                            );
                                          })}
                                        </SelectContent>
                                      </SelectTrigger>
                                    </FormControl>
                                  </Select>
                                ) : (
                                  <Input
                                    type={item.type}
                                    required={item.required}
                                    placeholder={item.placeholder}
                                    disabled={item.disabled}
                                    {...field}
                                  />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {item.addSeprator && (
                          <div className="py-4">
                            <Separator />
                          </div>
                        )}
                      </>
                    );
                  })}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Loader className="h-10 w-10" />
        </div>
      )}
    </>
  );
};

export default UpdateProfileDetailsPage;
