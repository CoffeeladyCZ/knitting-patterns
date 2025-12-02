import * as Dialog from "@radix-ui/react-dialog";

import { Cross2Icon } from "@radix-ui/react-icons";

import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "../schema/issueSchema";
import { useCreateIssueMutation } from "../api/hooks";
import { Button } from "./component-library/Button";
import { TextField } from "./component-library/TextField";
import { Label } from "./component-library/Label";

interface IssueDialogProps {
  repoId?: string;
}

const IssueDialog = ({ repoId }: IssueDialogProps) => {
  const form = useForm<{ title: string; description: string }>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onSubmit",
  });

  const createIssueMutation = useCreateIssueMutation();

  const handleSubmitIssue = form.handleSubmit(
    async ({ title, description }) => {
      if (!repoId) {
        console.error("Repository ID is required");
        return;
      }

      createIssueMutation.mutate(
        {
          repoId,
          title,
          body: description,
        },
        {
          onSuccess: () => {
            form.reset();
            console.log("Issue created successfully!");
          },
          onError: (error) => {
            console.error("Error creating issue:", error);
          },
        },
      );
    },
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant="primary"
          size="sm"
          disabled={!repoId}
          onClick={() => handleSubmitIssue()}
        >
          Add issue
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="bg-white fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          <FormProvider {...form}>
            <Dialog.Title className="m-0 text-2xl font-medium text-mauve12">
              Add issue
            </Dialog.Title>
            <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
              Add issue to the repository.
            </Dialog.Description>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <Label htmlFor="title">Title</Label>
              <TextField id="title" {...form.register("title")} />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <Label htmlFor="description">Description</Label>
              <TextField id="description" {...form.register("description")} />
            </fieldset>
          </FormProvider>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <Button
                onClick={() => handleSubmitIssue()}
                variant="primary"
                size="sm"
                disabled={!repoId}
              >
                Save changes
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <Button
              className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center text-text hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:outline-none"
              variant="ghost"
              size="icon"
              aria-label="Close"
            >
              <Cross2Icon />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default IssueDialog;
