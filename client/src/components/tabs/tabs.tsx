import { Children, isValidElement, useState } from "react";
import { TTabsProps } from "../../types/components-types";
import TabContent from "../tab-content/tab-content";
import Tab, { TTabProps } from "../tab/tab";
import st from "./tabs.module.css";
import mx from "../../mixins.module.css";
import cn from '../../utils/functions/cn';

function Tabs({ children, defaultActiveTab = 0 }: TTabsProps) {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(defaultActiveTab);

  return (
    <div className={st.tabs}>
      <ul className={cn(st["tab-headers"], mx["responsiveFont"])}>
        {Children.map(children, (child, idx) => {
          if (isValidElement<TTabProps>(child)) {
            return (
              <Tab
                key={idx}
                label={child.props.label}
                isActive={idx === activeTabIdx}
                setActiveTabIdx={child.props.disabled ? () => {} : () => setActiveTabIdx(idx)}
                idx={idx}
                variant={child.props.variant}
              />
            );
          }
          return null;
        })}
      </ul>

      <TabContent activeTabIdx={activeTabIdx}>{children}</TabContent>
    </div>
  );
}

export default Tabs;
