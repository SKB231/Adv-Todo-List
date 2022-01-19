import React, { Component, useState, useEffect, useRef } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import {
  AiTwotoneCalendar,
  AiOutlineCheck,
  AiFillCheckCircle,
} from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import TodoCategorySelector from "./TodoCategorySelector";
import SearchDate from "./SearchDate";

function Todo(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    props.updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
      categoryName: "None",
    });
  };

  function checkTodo(todo) {
    if (props.categoryName === "None") {
      return true;
    }

    if (props.categoryName === todo.categoryName) {
      return true;
    }

    return false;
  }

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  let arr = ["a", "b", "c"];


  return (
    //parent

    <div>
      {props.todos.map((todo) => {
        if (
          props.categoryName === todo.category ||
          props.categoryName === "None"
        ) {
          return (
            <div
              key={todo.id}
              id={todo.id}
              onClick={() => props.handleTodoClick(todo)}
              className="todo-container"
            >
              <div className="todo" id={todo.id + "secondaryContainer"}>
                {!todo.completed && (
                  <AiOutlineCheck
                    className="check-icon"
                    onClick={() => {
                      document
                        .getElementById("text" + todo.id)
                        .classList.toggle("Completed");
                      document
                        .getElementById(todo.id)
                        .classList.toggle("Completed");
                      props.changeTodoStatus(todo.id);
                    }}
                  />
                )}
                {todo.completed && (
                  <AiFillCheckCircle
                    className="check-icon"
                    onClick={() => {
                      document
                        .getElementById("text" + todo.id)
                        .classList.toggle("Completed");
                      document
                        .getElementById(todo.id)
                        .classList.toggle("Completed");
                        props.changeTodoStatus(todo.id);
                    }
                  }
                  />
                )}
                

                <div className="todo-text" id={"text" + todo.id}>
                  {todo.text.input}
                </div>

                <form
                  id={"form" + todo.id}
                  onSubmit={(event) => {
                    event.preventDefault();
                    props.changeTodoName(
                      todo.id,
                      document.getElementById("input" + todo.id).value,
                      document.getElementById("category" + todo.id).value
                    );
                  }}
                >
                  <input
                    placeholder="New Task Name"
                    type="text"
                    className="todo-task-nameChange-input"
                    id={"input" + todo.id}
                  />

                  {/* <select className="chooseCategory" id={"category" + todo.id}>
                    {props.categories.map((element) => (
                      <option key={element.id}>{element.name}</option>
                    ))}
                  </select> */}

                  <TodoCategorySelector
                    categories={props.categories}
                    id={todo.id}
                    editTodoCategory={props.editTodoCategory}
                    value={todo.category}
                  />

                </form>

                <div className="delete-icon" id={"delete" + todo.id}>
                  <RiCloseCircleLine
                    className="icon"
                    onClick={() => props.removeTodo(todo.id)}
                  />
                </div>
              </div>
              <div
                id={"secondaryText" + todo.id}
                className="todo-secondary-text"
              >
                {todo.category}
                <BsDot className="dot-icon" />{" "}
                <AiTwotoneCalendar className="calender-icon" /> Due{" "}
                {todo.dueDate}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Todo;
