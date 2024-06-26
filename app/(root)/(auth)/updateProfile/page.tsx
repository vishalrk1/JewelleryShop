"use client";
import FormatedForm from "@/components/forms/FormatedForm";
import Loader from "@/components/Loader";
import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createUserProfile } from "@/redux/store/auth/action";
import { RootState } from "@/redux/store/store";
import { supabase } from "@/redux/supabase";
import {
  AddressDetailsSchema,
  NewUserDetailsSchema,
  UserAddressFormFields,
  UserDetailsFormFields,
  UserDetailsFormSchema,
} from "@/schemas";
import { ProfileFormsCardTitle } from "@/utils/titlesData";
import { showErrorToast, showSucessToast } from "@/utils/toasts";
import { userDetailTabsData } from "@/utils/userDetailTabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@radix-ui/react-avatar";
import { CheckCircle2, Edit, Trash, UploadCloud } from "lucide-react";
import { redirect } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as z from "zod";

const UpdateProfileDetailsPage = () => {
  const dispatch = useDispatch<any>();
  const [activeTab, setActiveTab] = useState("profileDetails");
  const [isHidrate, setIsHidrate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [profileImag, setProfileImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const [userPfpFile, setUserPfpFile] = useState<File | null>(null);

  const { user, userData, fetching } = useSelector(
    (state: RootState) => state.auth
  );

  const form = useForm<z.infer<typeof NewUserDetailsSchema>>({
    resolver: zodResolver(NewUserDetailsSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      first_name: user?.first_name ? user?.first_name : "",
      last_name: user?.last_name ? user?.last_name : "",
      user_gender: userData?.user_gender ? userData?.user_gender : "",
      user_pfp_url: userData?.user_pfp_url
        ? userData?.user_pfp_url
        : "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/_744764ec-4726-41c4-8374-ffedf7fd8676.jpg",
      user_phone: userData?.user_phone ? userData?.user_phone : "",
      address_type: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    setIsHidrate(true);
    setActiveTab("profileDetails");
  }, []);

  useEffect(() => {
    if (!fetching) {
      if (!user) return redirect("/register");
    }
  }, [user, userData, fetching]);
  if (!isHidrate) return null;

  const handelSubmit = async (
    formData: z.infer<typeof NewUserDetailsSchema>
  ) => {
    setIsSubmitting(true);
    console.log(formData);
    try {
      if (profileImag && userPfpFile) {
        const { data, error } = await supabase.storage
          .from("Images")
          .upload(
            `user_pfp/${userPfpFile.name}_${user?.id}_${Date.now()}`,
            userPfpFile
          );
        if (error) {
          console.log(error);
          showSucessToast("Cant upload image please try again ");
          return;
        }
        formData.user_pfp_url = `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/Images/${data.path}`;
      }
      dispatch(
        createUserProfile({
          userData: formData,
          userId: user?.id,
        })
      );
    } catch (error) {
      showErrorToast("Cant upload image please try again ");
      console.log(error);
    }
    setIsSubmitting(false);
  };

  const handelImageInput = (e: any) => {
    const file = e.target.files[0];
    setUserPfpFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
      }
    };
    reader?.readAsDataURL(file);
  };

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className="w-full items-center justify-center"
    >
      <TabsList>
        {userDetailTabsData.map((item, index) => (
          <TabsTrigger key={index} value={item.value}>
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {!fetching ? (
        <div className="w-full flex items-start my-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handelSubmit)} className="w-full">
              <Card>
                <CardHeader>
                  <CardTitle>{ProfileFormsCardTitle[activeTab]}</CardTitle>
                  <CardDescription>
                    Update your profile details here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TabsContent value="pfpImage">
                    <div className="md:w-1/2 mx-auto">
                      {!profileImag && (
                        <div className="items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className="flex items-center gap-2 p-1 w-full h-24 border-2 border-gray-300 border-dashed rounded-lg text-center cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center w-full text-center pt-5 pb-6">
                              <UploadCloud className="w-8 h-8 mb-1 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                            </div>

                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                              onChange={handelImageInput}
                              required
                            />
                          </label>
                        </div>
                      )}
                      <Avatar className="flex items-center justify-center w-full h-full">
                        <AvatarImage
                          src={profileImag as string}
                          className="rounded-full h-1/2 w-1/2 object-cover pointer-events-none"
                        />
                      </Avatar>
                    </div>
                  </TabsContent>
                  <TabsContent value="profileDetails">
                    <FormatedForm form={form} schema={UserDetailsFormFields} />
                  </TabsContent>
                  <TabsContent value="userAddress">
                    <FormatedForm form={form} schema={UserAddressFormFields} />
                  </TabsContent>
                </CardContent>
                <CardFooter className="flex justify-end items-center gap-2">
                  {activeTab === "pfpImage" && profileImag !== null && (
                    <Button
                      onClick={() => setProfileImage(null)}
                      className="w-1/4 text-base"
                    >
                      <Edit className="mr-4" />
                      Edit
                    </Button>
                  )}
                  {activeTab === "userAddress" && (
                    <Button
                      className="w-1/4 text-base"
                      disabled={fetching}
                      type="submit"
                      onSubmit={form.handleSubmit(handelSubmit)}
                    >
                      {fetching && (
                        <Loader
                          className="w-4 h-4 border-2"
                          color="border-gray-100"
                        />
                      )}
                      Submit
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </form>
          </Form>
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
