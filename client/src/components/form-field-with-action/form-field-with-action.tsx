import { TCopyItem } from "../../types/components-types";
import st from "./form-field-with-action.module.css";

function FormFieldWithAction({ children }: TCopyItem) {
  return <div className={st["form-field"]}>{children}</div>;
}

export default FormFieldWithAction;
