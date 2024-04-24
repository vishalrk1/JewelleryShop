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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/redux/store/store";
import { UserDetailsFormFields, UserDetailsFormSchema } from "@/schemas";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import * as z from "zod";

const UpdateProfileDetailsPage = () => {
  const { user, userData, fetching } = useSelector(
    (state: RootState) => state.auth
  );

  const form = useForm<z.infer<typeof UserDetailsFormSchema>>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      first_name: user?.first_name ? user?.first_name : "",
      last_name: user?.last_name ? user?.last_name : "",
      user_gender: userData?.user_gender ? userData?.user_gender : "",
      user_pfp_url: userData?.user_pfp_url ? userData?.user_pfp_url : "",
      user_phone: userData?.user_phone ? userData?.user_phone : "",
    },
  });

  useEffect(() => {
    if (!fetching) {
      console.log("user check");
      if (!user) return redirect("/register");
    }
  }, [user]);

  return (
    <Tabs defaultValue="profileDetails">
      <TabsList>
        <TabsTrigger value="pfpImage">Profile Image</TabsTrigger>
        <TabsTrigger value="profileDetails">Profile Details</TabsTrigger>
        <TabsTrigger value="userAddress">Address</TabsTrigger>
      </TabsList>
      {!fetching ? (
        <div className="flex items-start my-4">
          <Card className="md:w-screen max-w-5xl">
            <CardHeader>
              <CardTitle>Update Profile Details</CardTitle>
              <CardDescription>
                Update your profile details here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="profileDetails">
                <Form {...form}>
                  <form className="grid grid-cols-2 gap-4">
                    {UserDetailsFormFields.map((item, index) => {
                      return (
                        <FormField
                          key={index}
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
                      );
                    })}
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="pfpImage">Image Data Input</TabsContent>
              <TabsContent value="userAddress">Address Data Input</TabsContent>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Loader className="h-10 w-10" />
        </div>
      )}
    </Tabs>
  );
};

export default UpdateProfileDetailsPage;
