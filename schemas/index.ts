import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export interface FormSchemaType {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  disabled?: boolean;
  addSeprator?: boolean;
  options?: { label: string; value: string }[];
}

export const LoginSchema = z.object({
  phone: z.string().min(10, { message: "Invalid phone" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  phone: z.string().min(10, { message: "Invalid phone" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(3, { message: "Password should be at least 3 characters long" }),
});

export const NewUserDetailsSchema = z.object({
  // user details fields
  username: z.string().min(1, { message: "Username is requires" }),
  email: z.string().email({ message: "Invalid email" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  user_gender: z.string().min(1, { message: "Gender is required" }),
  phone: z.string().min(10, { message: "Valid Phone is required" }),
  image: z.string().min(1, { message: "Image is required" }),
});

export const UserDetailsFormSchema = z.object({
  username: z.string().min(1, { message: "Username is requires" }),
  email: z.string().email({ message: "Invalid email" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  user_gender: z.string().min(1, { message: "Gender is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  user_pfp_url: z.string().min(1, { message: "Image is required" }),
  user_image_file: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg and .png formats are supported."
    ),
});

// export const AddressDetailsSchema = z.object({
//   address_type: z.string().min(1, { message: "Address type is required" }),
//   address_line1: z.string().min(1, { message: "Address line 1 is required" }),
//   address_line2: z.string().min(1, { message: "Address line 2 is required" }),
//   city: z.string().min(1, { message: "City is required" }),
//   state: z.string().min(1, { message: "State is required" }),
//   country: z.string().min(1, { message: "Country is required" }),
//   postal_code: z.string().min(1, { message: "Postal code is required" }),
// });

export const productFormSchema = z.object({
  prod_title: z.string().min(1, "Name is required"),
  prod_image_url: z.string().min(0, "Image is required"),
  prod_desc: z.string().min(1, "Description is required"),
  prod_price: z.number().min(1, "Price is required"),
  prod_old_price: z.number().min(1, "Old price is required"),
  prod_specs: z.string().min(1, "Specification is required"),
  prod_instock: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  category_id: z.string().min(1, "Category is required"),
});

export const UserDetailsFormFields = [
  {
    label: "username",
    name: "username",
    type: "text",
    placeholder: "Enter your name",
    required: true,
    disabled: true,
    addSeprator: false,
  },
  {
    label: "email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
    disabled: true,
    addSeprator: true,
  },
  {
    label: "First Name",
    name: "first_name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
    disabled: false,
    addSeprator: false,
  },
  {
    label: "Last Name",
    name: "last_name",
    type: "text",
    placeholder: "",
    required: false,
    disabled: false,
    addSeprator: false,
  },
  {
    label: "Phone",
    name: "phone",
    type: "number",
    placeholder: "Enter your phone",
    required: true,
    disabled: false,
    addSeprator: false,
  },
  {
    label: "Gender",
    name: "user_gender",
    type: "select",
    placeholder: "select your gendet",
    required: true,
    disabled: false,
    addSeprator: false,
    options: [
      { label: "Male", value: "M" },
      { label: "Female", value: "F" },
      { label: "Other", value: "O" },
    ],
  },
] as FormSchemaType[];

export const UserAddressFormFields = [
  {
    label: "Address Type",
    name: "address_type",
    type: "select",
    placeholder: "select your address type",
    required: true,
    options: [
      { label: "Home", value: "Home" },
      { label: "Work", value: "Work" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    label: "Address Line 1",
    name: "address_line1",
    type: "text",
    placeholder: "Enter your address",
    required: true,
  },
  {
    label: "Address Line 2",
    name: "address_line2",
    type: "text",
    placeholder: "Enter your address",
    required: false,
  },
  {
    label: "City",
    name: "city",
    type: "text",
    placeholder: "Enter your city",
    required: true,
  },
  {
    label: "State",
    name: "state",
    type: "text",
    placeholder: "Enter your state",
    required: true,
  },
  {
    label: "Country",
    name: "country",
    type: "text",
    placeholder: "Enter your country",
    required: true,
  },
  {
    label: "Postal code",
    name: "postal_code",
    type: "number",
    placeholder: "Enter your pincode",
    required: true,
  },
] as FormSchemaType[];

export const AddressDetailsSchema = z.object({
  address_type: z.string().min(1, { message: "Address type is required" }),
  address_line1: z.string().min(1, { message: "Address line 1 is required" }),
  address_line2: z.string().min(1, { message: "Address line 2 is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  postal_code: z.string().min(1, { message: "Postal code is required" }),
});

export const UserDetailsSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  image: z.string().url().optional(),
  phone: z.string().optional(),
  address: AddressDetailsSchema.optional(),
});

export type FormData = z.infer<typeof UserDetailsSchema>;
