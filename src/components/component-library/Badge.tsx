import { cva } from "class-variance-authority";

type BadgeVariantKey = keyof typeof BadgeVariants.variant;
type BadgeSizeKey = keyof typeof BadgeVariants.size;

const BadgeVariants = {
  variant: {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    accent: "bg-accent text-white",
    destructive: "bg-destructive text-white",
    outline: "bg-transparent text-primary border border-primary",
  },
  size: {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  },
};

const badgeVariants = cva("", {
  variants: BadgeVariants,
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const Badge = ({ variant, size, ...props }: { 
  variant?: BadgeVariantKey;
  size?: BadgeSizeKey;
} & React.ComponentProps<"div">) => {
  return <div className={badgeVariants({ variant, size })} {...props}>Badge</div>;
};

const variantOptions = Object.keys(BadgeVariants.variant);
const sizeOptions = Object.keys(BadgeVariants.size);

export { Badge, badgeVariants, variantOptions, sizeOptions };
