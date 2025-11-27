import type { Meta, StoryObj } from "@storybook/react"
import { TextField } from "../component-library/TextField"
import { Label } from "./Label"

const meta = {
  title: "Label",
  component: Label,
  parameters: {
    docs: {
      description: {
        component: "A label component built with Radix UI, used to label form controls.",
      },
    },
  },
  argTypes: {
    htmlFor: {
      description: "The ID of the form control this label is associated with",
      control: "text",
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: "Email" },
}

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="input">Name</Label>
      <TextField
        type="text"
        id="input"
          placeholder="Enter your name"
        />
    </div>
  ),
}
