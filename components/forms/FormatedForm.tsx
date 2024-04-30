import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { FormSchemaType } from "@/schemas";

interface Props {
  schema: FormSchemaType[];
  form: any;
}

const FormatedForm: React.FC<Props> = ({ form, schema }) => {
  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schema.map((item: any, index: any) => {
          return (
            <FormField
              key={index}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  {!item.disabled && (
                    <FormLabel className="text-sm">{item.label}</FormLabel>
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
                              {item.options.map((option: any) => {
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
  );
};

export default FormatedForm;
