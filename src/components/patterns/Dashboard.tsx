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
import { useTranslation } from "react-i18next";

export const Patterns = () => {
  const { t } = useTranslation();
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
    return <div>{t("loading")}</div>;
  }

  if (isError) {
    return <div>{t("error", { error: error?.message })}</div>;
  }
  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center gap-2 mb-10 px-4">
        <h1 className="text-3xl text-start">{t("patterns.title")}</h1>
        <p className="text-sm text-gray-500 font-borel">
          {t("patterns.description")}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextField
                    type="text"
                    placeholder={t("patterns.search")}
                    icon={Search}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="text-destructive">
              {t("patterns.error", { error: error })}
            </div>
          )}
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
