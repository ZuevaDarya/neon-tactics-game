import { TFormItemProps } from '../../types/components-types';
import "./form-item.scss";

function FormItem({ label, name, placeholder, type, register, readonly, required}: TFormItemProps) {
  return (
    <label className="form-item">
      {label} :
      <input
        {...register(name, {required, maxLength: 30})}
        type={type}
        placeholder={placeholder}
        className="form-item__input"
        readOnly={readonly}
      />
    </label>
  );
}

export default FormItem;
