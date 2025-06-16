import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import "./button.scss";

const buttonVariants = cva("button", {
  variants: {
    variant: {
      default: "button_default",
      started: "button_started",
      btnForAdd: "add-button"
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TButton = VariantProps<typeof buttonVariants> & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ variant, children, className, ...props }: TButton) {
  return (
    <button {...props} className={clsx(buttonVariants({ variant }), className)}>
      {children}
    </button>
  );
}

export default Button;
