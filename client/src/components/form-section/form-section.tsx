import { TFormSectionProps } from '../../types/components-types';
import "./form-section.scss";

function FormSection({ title, children }: TFormSectionProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">{title}</h2>
      {children}
    </div>
  );
}

export default FormSection;
