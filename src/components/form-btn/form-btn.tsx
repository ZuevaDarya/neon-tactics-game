import { TFormBtnProps } from "../../types/components-types";
import "./form-btn.scss";

function FormBtn({ children, type, classType }: TFormBtnProps) {
  return (
    <button type={type} className={`form-btn form-btn_${classType}`}>
      {children}
    </button>
  );
}

export default FormBtn;
