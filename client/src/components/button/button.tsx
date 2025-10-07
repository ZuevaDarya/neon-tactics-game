import { cva, VariantProps } from "class-variance-authority";
import mx from "../../mixins.module.css";
import cn from "../../utils/functions/cn";
import st from "./button.module.css";

const buttonVariants = cva(st.button, {
  variants: {
    variant: {
      default: st["button--default"],
      cyan: st["button--cyan"],
      pink: st["button--pink"],
      closedCyan: [st["button--closed"], st["button--closed-cyan"]],
      copy: st["button--copy"],
      copyCyan: [st["button--copy"], st["button--copy-cyan"]],
      checkCyan: [st["button--check"], st["button--check-cyan"]],
      lightTheme: [st["button--toggle-theme"], st["button--toggle-theme-light"]],
      darkTheme: [st["button--toggle-theme"], st["button--toggle-theme-dark"]],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TButton = VariantProps<typeof buttonVariants> & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ variant, children, className, ...props }: TButton) {
  return (
    <button {...props} className={cn(mx["responsiveFont"], buttonVariants({ variant }), className)}>
      {children}
    </button>
  );
}

export default Button;
