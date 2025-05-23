import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import "./button.scss";

const buttonVariants = cva("button", {
  variants: {
    variant: {
      default: "button_default",
      started: "button_started",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TButton = VariantProps<typeof buttonVariants> & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ variant, children, ...props }: TButton) {
  return (
    <button {...props} className={clsx(buttonVariants({ variant }))}>
      {children}
    </button>
  );
}

export default Button;
