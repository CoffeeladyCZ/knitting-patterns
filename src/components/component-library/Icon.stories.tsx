import type { Meta, StoryObj } from "@storybook/react-vite";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import { Icon, sizeOptions } from "./Icon";

const meta = {
  title: "Icon",
  component: Icon,
  args: {
    as: GitHubLogoIcon,
    size: "md",
  },
  argTypes: {
    as: {
      description:
        "The SVG component to render. This should be a React component that renders an SVG.",
      control: false,
    },
    size: {
      control: "select",
      options: sizeOptions,
    },
  },
} as Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GitHub: Story = {};

export const Discord: Story = {
  args: {
    as: DiscordLogoIcon,
  },
};
