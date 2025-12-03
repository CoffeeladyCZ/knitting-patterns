import { Search } from "lucide-react";
import { useGetPatterns } from "../../api/ravelry/hooks";
import { PatternCard } from "./PatternCard";
import { TextField } from "../component-library/TextField";
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "../component-library/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  searchFormSchema,
  type SearchSchema,
} from "../../schema/patternSchema";
import { useState } from "react";

export const Patterns = () => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const { data, isLoading, isError, error } = useGetPatterns(searchQuery);

  const form = useForm({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(searchFormSchema),
  });

  const onSubmit = async (values: SearchSchema) => {
    setSearchQuery(values.search.trim() || undefined);
    form.reset();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl text-start">Patterns</h1>
        <p className="text-sm text-gray-500 font-borel">
          ... powered on Ravelry
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextField
                    type="text"
                    placeholder="Search patterns..."
                    icon={Search}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </Form>
      <div className="flex flex-wrap gap-4 mt-6">
        {data?.patterns.map((pattern) => (
          <PatternCard key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </div>
  );
};
