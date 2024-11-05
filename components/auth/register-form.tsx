"use client";

import React from "react";
import * as z from "zod";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "./form-error";
import { FormSucess } from "./form-sucess";
import { redirect } from "next/navigation";
import Loader from "../Loader";
import useUserStore from "@/hooks/useUserStore";
import useAuthStore from "@/hooks/useAuthStore";

const RegisterForm = () => {
  const { registerUser, fetching, error } = useAuthStore();
  const { user } = useUserStore();

  if (user) {
    redirect("/updateProfile");
  }

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      phone: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
    registerUser(values.username, values.phone, values.email, values.password);
  };

  return (
    <CardWrapper
      headerTitle="🎉Join Us!🎉"
      headerLabel="We’re excited to have you here!"
      backButtonHref="/login"
      backButtonLbel="Already have an account?"
      showSocials={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              disabled={fetching}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your Username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              disabled={fetching}
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              disabled={fetching}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={fetching}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <FormError message={error} />}
          {user && !error && (
            <FormSucess message={"Registered in sucessfully, Enjoy shopping"} />
          )}
          <Button
            className="w-full flex gap-2"
            type="submit"
            disabled={fetching}
          >
            {fetching && (
              <Loader className="w-4 h-4 border-2" color="border-gray-100" />
            )}
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
