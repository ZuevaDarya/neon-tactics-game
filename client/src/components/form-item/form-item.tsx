import { FieldValues } from "react-hook-form";
import { TFormItemProps } from "../../types/components-types";
import Input from "../input/input";
import st from "./form-item.module.css";
import mx from "../../mixins.module.css";
import cn from '../../utils/functions/cn';

function FormItem<T extends FieldValues>({ label, ...props }: TFormItemProps<T>) {
  return (
    <label className={cn(mx["responsiveFont"], st["form-item"])}>
      {label}:
      <Input<T> {...props} />
    </label>
  );
}

export default FormItem;
