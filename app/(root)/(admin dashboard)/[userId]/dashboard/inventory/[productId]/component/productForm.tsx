// "use client";
// import React, { useState } from "react";
// import * as z from "zod";

// // import { products_product } from "@prisma/client";
// import { Heading } from "@/components/ui/heading";
// import { Button } from "@/components/ui/button";
// import { Router, Trash, UploadCloud } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Image from "next/image";
// import { AlertModal } from "@/components/modals/alertModal";
// import { productFormSchema } from "@/schemas";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { showErrorToast, showSucessToast } from "@/utils/toasts";
// import Loader from "@/components/Loader";

// interface ProductFormProps {
//   initialData: any | null;
//   categories: any[];
//   cat_id: string;
//   userId: string;
// }

// const ProductForm: React.FC<ProductFormProps> = ({
//   initialData,
//   categories,
//   cat_id,
//   userId,
// }) => {
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [productImage, setproductImage] = useState<string | ArrayBuffer | null>(
//     null
//   );
//   const [userPfpFile, setUserPfpFile] = useState<File | null>(null);

//   const title = initialData ? "Edit Product" : "Create Product";
//   const description = initialData
//     ? "Edit a product details"
//     : "Create a New Product";
//   const toastMessage = !initialData ? "Product Created" : "Product Updated";
//   const action = initialData ? "Save Changes" : "Create";

//   const form = useForm<z.infer<typeof productFormSchema>>({
//     resolver: zodResolver(productFormSchema),
//     values: initialData
//       ? {
//           ...initialData,
//           prod_desc: initialData?.prod_desc || "",
//           prod_price: Number(initialData?.prod_price),
//           prod_old_price: Number(initialData?.prod_old_price),
//           prod_specs: initialData?.prod_specs || "",
//           category_id: cat_id,
//         }
//       : {
//           category_id: "",
//           prod_title: "",
//           prod_desc: "",
//           prod_image_url: "",
//           prod_price: 0,
//           prod_instock: true,
//           is_featured: false,
//           prod_old_price: 0,
//           prod_specs: "",
//         },
//   });

//   const handelImageInput = (e: any) => {
//     const file = e.target.files[0];
//     setUserPfpFile(file);
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setproductImage(reader.result);
//       }
//     };
//     reader?.readAsDataURL(file);
//   };

//   const onSubmit = async (data: z.infer<typeof productFormSchema>) => {
//     console.log("Initial Data: ", initialData);
//     try {
//       setLoading(true);
//       if (initialData) {
//         const req = await axios.patch(
//           `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/products/${initialData.id}`,
//           { ...data, userId: userId }
//         );
//         if (req.status === 200) {
//           setLoading(false);
//           router.push(`/${userId}/dashboard/inventory`);
//           toast.success("Product Updated Sucessfully", {
//             position: "top-right",
//           });
//         }
//       } else {
//         console.log("Starting aupload product", data);
//         try {
//           if (userPfpFile && productImage) {
//             const catName = categories.find(
//               (cat) => cat.cat_id === data.category_id
//             )?.cat_title;
//             console.log(catName);
//             const { data: imgData, error } = await supabase.storage
//               .from("Images")
//               .upload(
//                 `product_images/${catName}/${catName}_${new Date().getTime()}`,
//                 userPfpFile
//               );
//             data.prod_image_url = `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/Images/${imgData?.path}`;
//             if (error) {
//               setLoading(false);
//               showErrorToast("Cant upload image please try again ");
//               return;
//             }
//           } else {
//             throw new Error("Image is required");
//           }
//         } catch (error) {
//           setLoading(false);
//           toast.error("Failed to upload Image", {
//             position: "top-right",
//           });
//         }

//         const req = await axios.post(
//           `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/products`,
//           { ...data, userId: userId }
//         );
//         setLoading(false);
//         router.push(`/${userId}/dashboard/inventory`);
//         toast.success("Product Added Sucessfully", {
//           position: "top-right",
//         });
//       }
//     } catch (error) {
//       setLoading(false);
//       showErrorToast("Failed to create product");
//       console.log(error);
//     }
//   };

//   const onDelete = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.delete(
//         `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/products/${initialData?.id}`
//       );
//       if (res.status === 200) {
//         router.push(`/${userId}/dashboard/inventory`);
//         toast.success("Product Deleted Sucessfully", {
//           position: "top-right",
//         });
//         setLoading(false);
//       }
//     } catch (error) {
//       setLoading(false);
//       showErrorToast("Failed to delete product");
//     }
//   };

//   return (
//     <>
//       <AlertModal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         onConfirm={onDelete}
//         loading={loading}
//       />
//       <div className="flex items-center justify-between">
//         <Heading title={title} description={description} />
//         {initialData && (
//           <Button
//             disabled={loading}
//             variant="destructive"
//             size="icon"
//             onClick={() => setOpen(true)}
//           >
//             <Trash className="h-4 w-4" />
//           </Button>
//         )}
//       </div>
//       <Separator className="my-4" />
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-8 w-full"
//         >
//           {!initialData ? (
//             <div className="w-full flex items-center justify-start">
//               {!productImage ? (
//                 <div className="w-max">
//                   <label
//                     htmlFor="dropzone-file"
//                     className="flex items-center gap-2 p-1 w-full h-24 border-2 border-gray-300 border-dashed rounded-lg text-center cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//                   >
//                     <div className="flex flex-col items-center justify-center w-full text-center pt-5 pb-6 px-10">
//                       <UploadCloud className="w-8 h-8 mb-1 text-gray-400" />
//                       <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                         <span className="font-semibold">Click to upload</span>{" "}
//                         or drag and drop
//                       </p>
//                     </div>
//                     <input
//                       id="dropzone-file"
//                       type="file"
//                       className="hidden"
//                       onChange={handelImageInput}
//                       required
//                     />
//                   </label>
//                 </div>
//               ) : (
//                 <div className="bg-slate-50 p-2 rounded-md w-max">
//                   <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
//                     <div className="z-10 absolute top-2 right-2">
//                       <Button
//                         onClick={() => setproductImage(null)}
//                         type="button"
//                         variant="destructive"
//                         size="icon"
//                       >
//                         <Trash className="h-4 w-4" />
//                       </Button>
//                     </div>
//                     <Image
//                       fill
//                       className="object-cover pointer-events-none"
//                       alt="Image"
//                       src={productImage as string}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="bg-slate-50 p-2 rounded-md w-max">
//               <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
//                 {/* <div className="z-10 absolute top-2 right-2">
//                   <Button
//                     // onClick={() => onRemove(url)}
//                     type="button"
//                     variant="destructive"
//                     size="icon"
//                   >
//                     <Trash className="h-4 w-4" />
//                   </Button>
//                 </div> */}
//                 <Image
//                   fill
//                   className="object-cover"
//                   alt="Image"
//                   src={initialData?.prod_image_url}
//                 />
//               </div>
//             </div>
//           )}
//           <div className="grid grid-cols-1 md:gird-cols-2 lg:grid-cols-3 gap-6">
//             <FormField
//               control={form.control}
//               name="prod_title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Product Name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="prod_price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Price</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       placeholder="Product Price"
//                       {...field}
//                       {...form.register("prod_price", { valueAsNumber: true })}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="prod_old_price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Old Product Price</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       placeholder="Old Product Price"
//                       {...field}
//                       {...form.register("prod_old_price", {
//                         valueAsNumber: true,
//                       })}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="category_id"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Category</FormLabel>
//                   <FormControl>
//                     <Select
//                       //   disabled={loading}
//                       defaultValue={field.value}
//                       onValueChange={field.onChange}
//                       value={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a Category" />
//                           <SelectContent>
//                             {categories.map((item) => (
//                               <SelectItem key={item.id} value={item.cat_id}>
//                                 {item.cat_title}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </SelectTrigger>
//                       </FormControl>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="prod_desc"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Description</FormLabel>
//                   <FormControl>
//                     <Textarea placeholder="Product Description" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="prod_specs"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product Specifications</FormLabel>
//                   <FormControl>
//                     <Textarea placeholder="Product Specifications" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="is_featured"
//               render={({ field }) => (
//                 <div className="flex flex-col space-y-2">
//                   <FormLabel>Product Featured</FormLabel>
//                   <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value}
//                         // @ts-ignore
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>
//                     <div className="space-y-1 leading-none">
//                       <FormLabel>Featured</FormLabel>
//                       <FormDescription>
//                         This product will appear on homepage.
//                       </FormDescription>
//                     </div>
//                   </FormItem>
//                 </div>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="prod_instock"
//               render={({ field }) => (
//                 <div className="flex flex-col space-y-2">
//                   <FormLabel>Product Stock Available</FormLabel>
//                   <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value}
//                         // @ts-ignore
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>
//                     <div className="space-y-1 leading-none">
//                       <FormLabel>Stack Availabel</FormLabel>
//                       <FormDescription>
//                         Is this product in stock available for purchase?
//                       </FormDescription>
//                     </div>
//                   </FormItem>
//                 </div>
//               )}
//             />
//           </div>
//           <Button
//             className="ml-auto"
//             type="submit"
//             disabled={loading}
//           >
//             {action}
//             {loading && (
//               <Loader className="w-4 h-4 border-2 mx-4" color="border-gray-100" />
//             )}
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// };

// export default ProductForm;
