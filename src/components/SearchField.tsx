import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import type { ChangeEvent, KeyboardEvent } from "react";

type Props = {
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
};

export const SearchField = ({
  placeholder,
  value,
  onValueChange,
  onSubmit,
}: Props) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <TextField.Root
      placeholder={placeholder}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        onValueChange(event.target.value)
      }
      onKeyDown={handleKeyDown}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
};