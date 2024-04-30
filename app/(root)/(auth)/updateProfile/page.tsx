"use client";
import FormatedForm from "@/components/forms/FormatedForm";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  AddressDetailsSchema,
  UserAddressFormFields,
  UserDetailsFormFields,
  UserDetailsFormSchema,
} from "@/schemas";
import { ProfileFormsCardTitle } from "@/utils/titlesData";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import * as z from "zod";

const UpdateProfileDetailsPage = () => {
  const [activeTab, setActiveTab] = React.useState("profileDetails");
  const [isHidrate, setIsHidrate] = React.useState(false);

  const { user, userData, fetching } = useSelector(
    (state: RootState) => state.auth
  );

  const form = useForm<z.infer<typeof UserDetailsFormSchema>>({
    resolver: zodResolver(UserDetailsFormSchema),
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

  const addressForm = useForm<z.infer<typeof AddressDetailsSchema>>({
    resolver: zodResolver(AddressDetailsSchema),
    defaultValues: {
      address_type: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
    },
  });

  useEffect(() => {
    setIsHidrate(true);
    setActiveTab("profileDetails");
  }, []);

  useEffect(() => {
    if (!fetching) {
      console.log("user check");
      if (!user) return redirect("/register");
    }
  }, [user]);

  if (!isHidrate) return null;

  const handelSubmit = (values: z.infer<typeof UserDetailsFormSchema>) => {
    console.log(values);
  };

  return (
    <Tabs defaultValue="profileDetails" className="m-4">
      <TabsList>
        <TabsTrigger value="pfpImage" onClick={() => setActiveTab("pfpImage")}>
          Profile Image
        </TabsTrigger>
        <TabsTrigger
          value="profileDetails"
          onClick={() => setActiveTab("profileDetails")}
        >
          Profile Details
        </TabsTrigger>
        <TabsTrigger
          value="userAddress"
          onClick={() => setActiveTab("userAddress")}
        >
          Address
        </TabsTrigger>
      </TabsList>
      {!fetching ? (
        <div className="w-full flex items-start my-4">
          <Card className="md:w-full max-w-screen-2xl">
            <CardHeader>
              <CardTitle>{ProfileFormsCardTitle[activeTab]}</CardTitle>
              <CardDescription>
                Update your profile details here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="profileDetails">
                <FormatedForm form={form} schema={UserDetailsFormFields} />
              </TabsContent>
              <TabsContent value="pfpImage">Image Data Input</TabsContent>
              <TabsContent value="userAddress">
                <FormatedForm
                  form={addressForm}
                  schema={UserAddressFormFields}
                />
              </TabsContent>
            </CardContent>
            <CardFooter className="flex justify-end items-center">
              <Button
                onClick={() => handelSubmit(form.getValues())}
                className="w-1/4 text-base"
              >
                {activeTab === "userAddress" ? "Submit" : "Next"}
              </Button>
            </CardFooter>
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
