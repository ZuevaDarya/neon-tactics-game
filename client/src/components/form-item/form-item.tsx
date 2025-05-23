import { FieldValues } from "react-hook-form";
import { TFormItemProps } from "../../types/components-types";
import Input from "../input/input";
import "./form-item.scss";

function FormItem<T extends FieldValues>({ label, ...props }: TFormItemProps<T>) {
  return (
    <label className="form-item">
      {label}:
      <Input<T> {...props} />
    </label>
  );
}

export default FormItem;
