import React from "react";

export default function Element(props) {
  return (
    <div className="ele ratio">
      <div className="inner">
        <div className="box"></div>
        {props.children}
      </div>
    </div>
  );
}
