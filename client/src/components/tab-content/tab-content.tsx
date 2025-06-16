import { Children, isValidElement } from "react";
import { TTabContentProps, TTabProps } from "../../types/components-types";
import Tab from "../tab/tab";
import "./tab-content.scss";

function TabContent({ children, activeTabIdx }: TTabContentProps) {
  const getActiveContent = () => {
    const arrayChildren = Children.toArray(children);
    let tabIdx = 0;

    for (const child of arrayChildren) {
      if (isValidElement<TTabProps>(child) && child.type === Tab) {
        if (tabIdx === activeTabIdx) {
          return child.props.children;
        }
        tabIdx++;
      }
    }
    return null;
  };

  return <div className="tab-content">{getActiveContent()}</div>;
}

export default TabContent;
