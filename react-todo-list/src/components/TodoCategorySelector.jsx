import React, { Component, useState } from "react";

function TodoCategorySelector(props) {


  return (
    <select className="chooseCategory" id={"category" + props.id}>
      {props.categories.map((element) => (
        <option key={element.id}>{element.name}</option>
      ))}
    </select>
  );
}

export default TodoCategorySelector;
