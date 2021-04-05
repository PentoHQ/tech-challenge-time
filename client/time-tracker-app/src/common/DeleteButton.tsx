import React from "react";
import deleteIcon from "../assets/delete.png";

interface IDeleteButtonProps {
  loading: boolean;
  onDelete: () => void;
}
const DeleteButton: React.FunctionComponent<IDeleteButtonProps> = (props) => {
  return (
    <button
      disabled={props.loading}
      onClick={props.onDelete}
      className={`${props.loading ? "disabled" : ""} action`}
    >
      <img src={deleteIcon} alt="delete" />
    </button>
  );
};

export default DeleteButton;
