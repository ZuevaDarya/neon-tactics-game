import { TFormBtnProps } from "../../types/components-types";
import "./form-btn.scss";

function FormBtn({ children, type, classType, onClick }: TFormBtnProps) {
  return (
    <button type={type} className={`form-btn form-btn_${classType}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default FormBtn;
