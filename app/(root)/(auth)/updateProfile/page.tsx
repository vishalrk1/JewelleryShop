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
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUserStore from "@/hooks/useUserStore";
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
import React, { use, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import NoUserImage from "../../../../public/assets/NoUserImage.jpg";

import * as z from "zod";

const UpdateProfileDetailsPage = () => {
  const { user, fetching } = useUserStore();
  const [isHidrate, setIsHidrate] = useState(false);
  const [profileImag, setProfileImage] = useState<string | ArrayBuffer | null>(
    NoUserImage.src
  );
  const [userPfpFile, setUserPfpFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof NewUserDetailsSchema>>({
    resolver: zodResolver(NewUserDetailsSchema),
    defaultValues: {
      email: user?.email,
      first_name: user?.first_name ? user?.first_name : "",
      last_name: user?.last_name ? user?.last_name : "",
      image: user?.image ? user?.image : NoUserImage.src,
      user_phone: user?.phone ? user?.phone : "",
    },
    mode: "onChange",
  });

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

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <main className="min-h-screen px-8 flex items-center justify-center w-full h-screen gap-10 mb-4">
      <section className="h-full w-1/3 flex flex-col items-center justify-start">
        <div className="flex flex-col items-center gap-4">
          <Avatar>
            <AvatarImage
              src={form.getValues().image as string}
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
            onChange={handelImageInput}
            accept="image/*"
          />
        </div>
      </section>
      <section className="px-6 h-full w-full flex flex-col items-center justify-start">
        <div className="w-full grid grid-cols-2 gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {})}
              className="flex flex-wrap gap-4 w-full"
            >
              <FormField name="email" control={form.control} render={({field})=>(
                <FormItem>

                </FormItem>
              )}>

              </FormField>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
  //   formData: z.infer<typeof NewUserDetailsSchema>
  // ) => {
  //   setIsSubmitting(true);
  //   try {
  //     if (profileImag && userPfpFile) {
  //       const { data, error } = await supabase.storage
  //         .from("Images")
  //         .upload(
  //           `user_pfp/${userPfpFile.name}_${user?.id}_${Date.now()}`,
  //           userPfpFile
  //         );
  //       if (error) {
  //         console.log(error);
  //         showSucessToast("Cant upload image please try again ");
  //         return;
  //       }
  //       formData.user_pfp_url = `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/Images/${data.path}`;
  //     }
  //     dispatch(
  //       createUserProfile({
  //         userData: formData,
  //         userId: user?.id,
  //       })
  //     );
  //   } catch (error) {
  //     showErrorToast("Cant upload image please try again ");
  //     console.log(error);
  //   }
  //   setIsSubmitting(false);
  // };
};

export default UpdateProfileDetailsPage;
