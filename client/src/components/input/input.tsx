import { cva, VariantProps } from "class-variance-authority";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import mx from "../../mixins.module.css";
import cn from "../../utils/functions/cn";
import st from "./input.module.css";

const inputVariants = cva(st.input, {
  variants: {
    variant: {
      cyan: st["input--cyan"],
      pink: st["input--pink"],
      cyanDisabled: st["input--cyan-disabled"],
      pinkDisabled: st["input--pink-disabled"],
    },
  },
});

export type TInputProps<T extends FieldValues> = VariantProps<typeof inputVariants> & {
  register: UseFormRegister<T>;
  name: Path<T>;
  isUpperCase?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

function Input<T extends FieldValues>({
  variant,
  register,
  required,
  isUpperCase,
  ...props
}: TInputProps<T>) {
  return (
    <input
      className={cn(
        mx["responsiveFont"],
        inputVariants({ variant }),
        isUpperCase && st["input--text-upper"]
      )}
      {...register(props.name, { required, maxLength: 30 })}
      {...props}
    />
  );
}

export default Input;
