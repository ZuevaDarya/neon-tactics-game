import { cva, VariantProps } from "class-variance-authority";
import cn from "../../utils/functions/cn";
import st from "./tab.module.css";

const tabVariants = cva(st.tab, {
  variants: {
    variant: {
      cyan: st["tab--cyan"],
      pink: st["tab--pink"],
    },
  },
});

export type TTabProps = {
  isActive?: boolean;
  setActiveTabIdx?: () => void;
  idx?: number;
  children?: React.ReactNode;
  label: string;
  disabled?: boolean;
} & VariantProps<typeof tabVariants>;

function Tab({ isActive, setActiveTabIdx, label, variant }: TTabProps) {
  return (
    <li
      className={cn(tabVariants({ variant }), isActive && st["tab--active"])}
      onClick={setActiveTabIdx}
    >
      {label}
    </li>
  );
}

export default Tab;
