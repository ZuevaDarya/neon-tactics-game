import { TFormProps } from "../../types/components-types";
import cn from '../../utils/functions/cn';
import st from "./form.module.css";

function Form({ children, ...props }: TFormProps) {
  return <form className={cn(st.form, st["form--mt-40"])} {...props}>{children}</form>;
}

export default Form;
