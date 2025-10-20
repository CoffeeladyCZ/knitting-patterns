import * as Dialog from "@radix-ui/react-dialog";

import { Cross2Icon } from "@radix-ui/react-icons";

import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "../schema/issueSchema";
import { useCreateIssueMutation } from "../api/hooks";

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
		mode: "onSubmit"
	})

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
          body: description 
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
				<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
					Add issue
				</button>
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
							<label
								className="w-[90px] text-left text-[15px] text-violet11"
								htmlFor="title"
							>
								Title
							</label>
							<input
								className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
								id="title"
								{...form.register("title")}
							/>
						</fieldset>
						<fieldset className="mb-[15px] flex items-center gap-5">
							<label
								className="w-[90px] text-left text-[15px] text-violet11"
								htmlFor="description"
							>
								Description
							</label>
							<input
								className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
								id="description"
								{...form.register("description")}
							/>
						</fieldset>

					</FormProvider>
					<div className="mt-[25px] flex justify-end">
						<Dialog.Close asChild>
							<button
							className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
							onClick={() => handleSubmitIssue()}
							disabled={!repoId}
							>
								Save changes
							</button>
						</Dialog.Close>
					</div>
					<Dialog.Close asChild>
						<button
							className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none cursor-pointer"
							aria-label="Close"
						>
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
};

export default IssueDialog;
