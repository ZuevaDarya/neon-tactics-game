import { TTabProps } from "../../types/components-types";
import "./tab.scss";

function Tab({ isActive, setActiveTabIdx, label }: TTabProps) {
  return (
    <li className={`tab ${isActive ? "tab_active" : ""}`} onClick={setActiveTabIdx}>
      {label}
    </li>
  );
}

export default Tab;
