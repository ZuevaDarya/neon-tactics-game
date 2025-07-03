import { Children, isValidElement, useState } from "react";
import { TTabProps, TTabsProps } from "../../types/components-types";
import TabContent from "../tab-content/tab-content";
import Tab from "../tab/tab";
import "./tabs.scss";

function Tabs({ children, defaultActiveTab = 0 }: TTabsProps) {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(defaultActiveTab);

  return (
    <div className="tabs">
      <ul className="tabs-header">
        {Children.map(children, (child, idx) => {
          if (isValidElement<TTabProps>(child)) {
            return (
              <Tab
                key={idx}
                label={child.props.label}
                isActive={idx === activeTabIdx}
                setActiveTabIdx={child.props.disabled ? () => {} : () => setActiveTabIdx(idx)}
                idx={idx}
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
