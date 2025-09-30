import { TCopyItem } from "../../types/components-types";
import st from "./copy-item.module.css";

function CopyItem({ children }: TCopyItem) {
  return <div className={st["copy-item"]}>{children}</div>;
}

export default CopyItem;
