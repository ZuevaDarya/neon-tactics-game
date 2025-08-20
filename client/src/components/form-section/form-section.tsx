import cn from "../../utils/functions/cn";
import st from "./form-section.module.css";
import mx from "../../mixins.module.css";

type TFormSectionProps = {
  title?: string;
  children: React.ReactNode;
};

function FormSection({ title, children }: TFormSectionProps) {
  return (
    <div className={cn(st["form__section"], st.section)}>
      {title && <h3 className={cn(st["section__title"], mx["responsiveFont"])}>{title}</h3>}
      <div className={cn(st["form__items"], st.items)}>{children}</div>
    </div>
  );
}

export default FormSection;
