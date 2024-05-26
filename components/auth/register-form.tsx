"use client";

import React, { useTransition } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/redux/store/auth/action";
import { RootState } from "@/redux/store/store";
import { redirect } from "next/navigation";
import Loader from "../Loader";

const RegisterForm = () => {
  const dispatch = useDispatch<any>();
  const { user, fetching } = useSelector((state: RootState) => state.auth);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");

  if (user) {
    redirect("/updateProfile");
  }

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange"
  });

  const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
    const email = values.email;
    const password = values.password;
    const name = values.username;
    dispatch(registerUser({ email, password, name }));
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
              disabled={isPending}
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
              name="email"
              disabled={isPending}
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
              disabled={isPending}
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
          <FormError message={error} />
          <FormSucess message={success} />
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
