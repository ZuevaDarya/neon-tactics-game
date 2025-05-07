import { TFormItemProps } from '../../types/components-types';
import "./form-item.scss";

function FormItem({ label, name, placeholder, type, readonly}: TFormItemProps) {
  return (
    <label className="form-item">
      {label} :
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        maxLength={30}
        className="form-item__input"
        readOnly={readonly}
      />
    </label>
  );
}

export default FormItem;
