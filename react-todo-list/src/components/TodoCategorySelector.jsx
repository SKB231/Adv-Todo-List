import React, { Component, useState } from "react";

function TodoCategorySelector(props) {
  
  return (
    <select className="chooseCategory" id={"category" + props.id} onDrop={() => {
      document.getElementById("category" + props.id).value=props.value;
    }}>
      <option key={"NoneSelector"+props.id}>None</option>
      {props.categories.map((element) => (
        <option key={element.id}>{element.name}</option>
      ))}
    </select>
  );
}

export default TodoCategorySelector;
