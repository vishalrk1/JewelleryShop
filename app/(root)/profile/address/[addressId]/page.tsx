"use client";
import Loader from "@/components/Loader";
import { AlertModal } from "@/components/modals/alertModal";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useAddressStore from "@/hooks/useAddressStore";
import useAuthStore from "@/hooks/useAuthStore";
import { useModel } from "@/hooks/useModal";
import { AddressDetailsSchema } from "@/schemas";
import { showErrorToast } from "@/utils/toasts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface AddressPageProps {
  params: { addressId: string };
}

const AddressPage: React.FC<AddressPageProps> = ({ params }) => {
  const { token } = useAuthStore();
  const { addresses, fetching, updateAddress, addAddress, deleteAddress } =
    useAddressStore();
  const { isOpen, onClose, onOpen } = useModel();
  //   const [showModal, setShowModal] = useState<boolean>(false);
  let address = addresses?.find((item) => item._id === params.addressId);
  const addressTypes = [
    { label: "Home", value: "Home" },
    { label: "Work", value: "Work" },
    { label: "Other", value: "Other" },
  ];
  const router = useRouter();

  const form = useForm<z.infer<typeof AddressDetailsSchema>>({
    resolver: zodResolver(AddressDetailsSchema),
    defaultValues: {
      address_line1: address?.address_line1 ?? "",
      address_line2: address?.address_line2 ?? "",
      city: address?.city ?? "",
      state: address?.state ?? "",
      country: address?.country ?? "",
      postal_code: address?.postal_code ?? "",
      address_type: address?.address_type ?? addressTypes[0].value,
    },
    values: address,
  });

  const onSubmit = (data: z.infer<typeof AddressDetailsSchema>) => {
    if (address && token) {
      updateAddress(data, address._id, token).then((data) => {
        if (data) {
          form.reset();
          router.back();
        }
      });
    } else if (token) {
      addAddress(data, token).then((data) => {
        if (data) {
          form.reset();
          router.back();
        }
      });
    } else {
      showErrorToast(`Please login to continue ☺️`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-start gap-4 mx-auto max-w-8xl mt-4 md:mt-6 px-4 md:px-12 mb-8">
      <AlertModal
        description="Are you sure you want to delete this address, This address will be permanently deleted"
        isOpen={isOpen}
        onClose={onClose}
        loading={fetching}
        onConfirm={() => {
          if (token && address) {
            deleteAddress(params.addressId, token).then((data) => {
              if (data) {
                onClose()
                router.back();
              }
            });
          }
        }}
      />
      <div className="w-full flex flex-col items-center justify-between gap-1 mb-2">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl font-semibold mb-1 mx-2">
            {address ? "Edit Address" : "Add New Address"}
          </h1>
          {address && (
            <Button
              variant="destructive"
              className="py-2 flex gap-2"
              onClick={() => {
                onOpen();
              }}
            >
              <Trash size={16} /> Delete
            </Button>
          )}
        </div>
        <Separator />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-6">
            <FormField
              name="address_line1"
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
              name="address_line2"
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
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="my-0 text-base">City</FormLabel>
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
              name="state"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="my-0 text-base">State</FormLabel>
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
              name="postal_code"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="my-0 text-base">Zip Code</FormLabel>
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
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="my-0 text-base">Country</FormLabel>
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
              name="address_type"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="my-0 text-base">Address Type</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={addressTypes[0].label} />
                          <SelectContent>
                            {addressTypes.map((option: any, index: number) => {
                              return (
                                <SelectItem value={option.value} key={index}>
                                  {option.label}
                                </SelectItem>
                              );
                            })}
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
          <div className="w-full flex items-center justify-end p-3 my-3 gap-2">
            <Button type="submit" disabled={fetching}>
              {address ? "Update Address" : "Add Address"}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default AddressPage;
