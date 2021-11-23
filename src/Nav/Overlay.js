import React from "react";
import ContactForm from "../Contact/ContactForm";
import About from "../Misc/About";
import Connect from "../DAO/Connect";
// example for tut video
//import UserForm from "../DAO/UserForm";

export default function Overlay(props) {
  let component;
  if (props.linkData === "contact") {
    component = <ContactForm />;
  } else if (props.linkData === "connect") {
    // example for tut video
    //component = <UserForm />;
    component = <Connect />;
  } else if (props.linkData === "about") {
    component = <About />;
  } else {
    component = <></>;
  }

  return (
    <div className={props.toggleData ? "nav_overlay active" : "nav_overlay"}>
      <span className={"bars"}></span>
      <span className={"bars"}></span>
      <span className={"bars"}></span>
      <span className={"bars"}></span>
      <div className="nav_items">
        <div
          className={
            props.toggleData ? "nav_container active" : "nav_container"
          }
        >
          {component}
        </div>
      </div>
    </div>
  );
}
