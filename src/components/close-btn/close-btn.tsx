import { TCloseBtnProps } from "../../types/components-types";
import "./close-btn.scss";

function CloseBtn({ onClick }: TCloseBtnProps) {
  return <button type="button" className="close-btn" onClick={onClick} />;
}

export default CloseBtn;
