import React from "react";
import { useSelector } from "react-redux";
import addTask_form from "../../store/actions/addTask_form";
import { useDispatch } from "react-redux/es/exports";
import "./../../variables.css";
import "./nav.css";
export default function Nav() {
  let title = useSelector((state) => state.activeCompReducer);
  let task_form = useSelector((state) => state.addTask_form);

  let dispatch = useDispatch();
  let handleClick = () => {
    dispatch(addTask_form(true));
  };
  return (
    <div className="nav">
      <h3>{title}</h3>
      {!task_form && (
        <button className="primaryBtn" onClick={() => handleClick()}>
          + Add task
        </button>
      )}
    </div>
  );
}
