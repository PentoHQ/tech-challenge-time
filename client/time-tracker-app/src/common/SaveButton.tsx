import React from "react";
import save from "../assets/save.png";

interface ISaveButtonProps {
  canSave: boolean;
  loading: boolean;
  onSave: () => void;
}
const SaveButton: React.FunctionComponent<ISaveButtonProps> = (props) => {
  return (
    <button
      disabled={!props.canSave || props.loading}
      onClick={props.onSave}
      className={`${!props.canSave ? "disabled" : ""}  action`}
    >
      <img src={save} alt="save" />
    </button>
  );
};

export default SaveButton;
