import { Children, isValidElement } from "react";
import { TTabContentProps } from "../../types/components-types";
import Tab from "../tab/tab";
import st from "../tab/tab.module.css"

function TabContent({ children, activeTabIdx }: TTabContentProps) {
  const getActiveContent = () => {
    const arrayChildren = Children.toArray(children);
    let tabIdx = 0;

    for (const child of arrayChildren) {
      if (isValidElement<TTabContentProps>(child) && child.type === Tab) {
        if (tabIdx === activeTabIdx) {
          return child.props.children;
        }
        tabIdx++;
      }
    }
    return null;
  };

  return <div className={st["tab__content"]}>{getActiveContent()}</div>;
}

export default TabContent;
