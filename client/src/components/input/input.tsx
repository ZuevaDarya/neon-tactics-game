import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import "./input.scss";

const inputVariants = cva("input", {
  variants: {
    variant: {
      default: "input_default",
      disabled: "input_disabled"
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type TInputProps<T extends FieldValues> = VariantProps<typeof inputVariants> & {
  register: UseFormRegister<T>;
  name: Path<T>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

function Input<T extends FieldValues>({ variant, register, required, ...props }: TInputProps<T>) {
  return (
    <input
      className={clsx(inputVariants({ variant }))}
      {...register(props.name, { required, maxLength: 30 })}
      {...props}
    />
  );
}

export default Input;
