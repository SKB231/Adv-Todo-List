import React, { Component, useState, useEffect, useRef } from "react";

function TodoForm(props) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  let inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });
  const handleSubmit = (v) => {
    v.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000 + 1),
      text: { input },
      category: props.categoryName,
      dueDate: new Date().toLocaleDateString("en-us"),
    });
    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-form-input"
        type="text"
        placeholder="Add a task"
        value={input}
        name="text"
        className="todo-input"
        onChange={handleChange}
        ref={inputRef}
        onSubmit={props.onSubmit}
      />
    </form>
  );
}

export default TodoForm;
