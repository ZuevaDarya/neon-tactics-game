import { TFormProps } from "../../types/components-types";
import "./form.scss";

function Form({ children, ...props }: TFormProps) {
  return <form className="form" {...props}>{children}</form>;
}

export default Form;
