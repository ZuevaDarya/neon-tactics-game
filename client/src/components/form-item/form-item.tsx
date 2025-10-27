import { FieldValues } from "react-hook-form";
import mx from "../../mixins.module.css";
import { TFormItemProps } from "../../types/components-types";
import cn from "../../utils/functions/cn";
import Input from "../input/input";
import st from "./form-item.module.css";

function FormItem<T extends FieldValues>({ label, errorMessage, ...props }: TFormItemProps<T>) {
  return (
    <label data-error-message={errorMessage} className={cn(mx["responsiveFont"], st["form-item"])}>
      {label}:
      <Input<T> {...props} />
    </label>
  );
}

export default FormItem;
