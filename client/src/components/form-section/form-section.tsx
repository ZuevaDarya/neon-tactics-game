import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import "./form-section.scss";

const sectionVariants = cva("items-block", {
  variants: {
    variant: {
      default: "items-block",
      ds_row: "items-block_ds-row",
      ds_column: "items-block_ds-column",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TFormSectionProps = VariantProps<typeof sectionVariants> & {
  title?: string;
  children: React.ReactNode;
};

function FormSection({ variant, title, children }: TFormSectionProps) {
  return (
    <div className="form__section">
      {title && <h2 className="form-section__title">{title}</h2>}
      <div className={clsx(sectionVariants({ variant }))}>{children}</div>
    </div>
  );
}

export default FormSection;
