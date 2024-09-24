"use client";

import React, { useTransition } from "react";
import * as z from "zod";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
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
import { RootState } from "@/redux/store/store";
import { redirect } from "next/navigation";
import { loginUser } from "@/redux/store/auth/action";
import Loader from "../Loader";
import useAuthStore from "@/hooks/useAuthStore";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  // const { user, fetching } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();
  const { loginUser, user, fetching } = useAuthStore();

  if (user) {
    redirect("/");
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    loginUser(values.phone, values.password);
  };

  return (
    <CardWrapper
      headerLabel="We're excited to see you again. Please log in to continue."
      headerTitle="✨Welcome Back!✨"
      backButtonHref="/register"
      backButtonLbel="Don't have an account?"
      showSocials={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
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
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
