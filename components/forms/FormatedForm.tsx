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
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {schema.map((item: any, index: any) => {
        return (
          <FormField
            key={index}
            name={item.name}
            control={form.control}
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
                          <SelectValue placeholder={item.placeholder} />
                          <SelectContent>
                            {item.options.map((option: any, index: number) => {
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
                  ) : (
                    <Input
                      type={item.type}
                      required={item.required}
                      placeholder={item.placeholder}
                      disabled={item.disabled}
                      {...field}
                      className="w-full"
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}
    </div>
  );
};

export default FormatedForm;
