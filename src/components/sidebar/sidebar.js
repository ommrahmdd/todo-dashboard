import React from "react";
import "./../../variables.css";
import "./sidebar.css";
import { Link } from "react-router-dom";
export default function sidebar() {
  // let links = document.querySelectorAll(".sidebar__list-item");
  // let handleClickOnLink = (e) => {
  //   links.forEach((link) => {
  //     link.classList.remove("active-link");
  //   });
  //   console.log(links);
  //   e.target.classList.add("active-link");
  //   console.log(e.target);
  // };
  return (
    <div className="sidebar">
      {/* logo */}
      <h3 className="logo">To - do</h3>
      <p className="allBoards">All Boards (2)</p>
      {/* list */}
      <ul className="sidebar__list">
        <li>
          <Link
            className="sidebar__list-item active-link"
            to="/"
            // onClick={(e) => handleClickOnLink(e)}
          >
            <i className="fa-solid fa-calendar-days"></i>
            Platform Launch
          </Link>
        </li>
        <li>
          <Link
            className="sidebar__list-item "
            to=""
            // onClick={(e) => handleClickOnLink(e)}
          >
            <i className="fa-solid fa-calendar-days"></i>
            Marketing Plan
          </Link>
        </li>
        <li>
          <Link
            className="sidebar__list-item  "
            to=""
            // onClick={(e) => handleClickOnLink(e)}
          >
            <i className="fa-solid fa-calendar-days"></i>
            Roadmap
          </Link>
        </li>
        <li>
          <p>+ create new board</p>
        </li>
      </ul>
    </div>
  );
}
