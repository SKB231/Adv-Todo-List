import { click } from "@testing-library/user-event/dist/click";
import React, { Component, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList(props) {
  const [todos, setTodos] = useState([]);
  const [categories, changeCategories] = useState([]);

  let singleSelectedTodoElement;
  let currentlySelectedTodoElement;

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text) || todo.text === "") {
      return;
    }
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const updateTodo = (todoID, newValue) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === todoID ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    let removeArr = JSON.parse(JSON.stringify(todos));
    removeArr = removeArr.filter((todo) => todo.id !== id);

    props.changeSelectedTodo(0);

    setTodos(removeArr);
  };

  const SubmitEvent = () => {
    // let inpElement = document.getElementById(
    //   "input" + currentlySelectedTodoElement
    // );
    // let textElement = document.getElementById(
    //   "text" + currentlySelectedTodoElement
    // );

    // inpElement.classList.remove("changeOngoing");
    // textElement.classList.remove("changeOngoing");

    toggleInputFields(currentlySelectedTodoElement,false);

    removeAllEventListeners();
  };

  const toggleInputFields = (id, shouldToggleOn) => {
    let inpElement = document.getElementById("input" + id);
    let textElement = document.getElementById("text" + id);
    let secondaryText = document.getElementById('secondaryText'+id);
    let selector = document.getElementById('category'+id);


    if (!shouldToggleOn) {
      inpElement.classList.remove("changeOngoing");
      textElement.classList.remove("changeOngoing");
      secondaryText.classList.remove("changeOngoing");
      selector.classList.remove("changeOngoing");
    } else {
      let newNameTextElement = document.getElementById("input" + id);
      let titleTextElement = document.getElementById("text" + id);
      newNameTextElement.classList.add("changeOngoing");
      newNameTextElement.focus();
      titleTextElement.classList.add("changeOngoing");
      secondaryText.classList.add("changeOngoing");

      selector.classList.add("changeOngoing");

      newNameTextElement.value = titleTextElement.innerText;
    }
  };

  const clickAwayEvent = (e) => {
    let clickedElement = e.target.id.match(/\d+/);
    if (!clickedElement || clickedElement[0] != currentlySelectedTodoElement) {
      
      toggleInputFields(currentlySelectedTodoElement, false);
      removeAllEventListeners();
    }
  };

  const removeAllEventListeners = () => {
    let formElement = document.getElementById(
      "form" + currentlySelectedTodoElement
    );
    formElement.removeEventListener("submit", SubmitEvent);
    document.removeEventListener("click", clickAwayEvent);
    currentlySelectedTodoElement = "";
  };

  const handleTodoClick = (todo) => {
    let domElement = document.getElementById(todo.id);

    if (
      domElement &&
      domElement.classList &&
      domElement.classList.contains("Selected") &&
      todo.id !== currentlySelectedTodoElement
    ) {
    //   let newNameTextElement = document.getElementById("input" + todo.id);
    //   let titleTextElement = document.getElementById("text" + todo.id);
         let formName = document.getElementById("form" + todo.id);

    //   newNameTextElement.classList.add("changeOngoing");

    //   newNameTextElement.focus();

    //   titleTextElement.classList.add("changeOngoing");

    //   newNameTextElement.value = titleTextElement.innerText;

      toggleInputFields(todo.id, true);
      formName.addEventListener("submit", SubmitEvent);
      document.addEventListener("click", clickAwayEvent);

      currentlySelectedTodoElement = todo.id;
      return;
    }

    singleSelectedTodoElement = todo.id;
    if (document.getElementById(singleSelectedTodoElement)) {
      props.changeSelectedTodo(singleSelectedTodoElement);
    } else {
      props.changeSelectedTodo(0);
    }

    let todos = document.getElementsByClassName("todo-container");

    for (let i = 0; i < todos.length; i++) {
      todos[i].classList.remove("Selected");
      let delIcon = document.getElementById("delete" + todos[i].id);
      delIcon.classList.remove("Selected");
    }
    let delIcon = document.getElementById("delete" + domElement.id);
    delIcon.classList.add("Selected");

    domElement.classList.add("Selected");
  };

  const changeTodoName = (id, newName) => {
    let oldTodos = JSON.parse(JSON.stringify(todos));

    oldTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.text.input = newName;
      }

      return todo;
    });

    setTodos(oldTodos);
  };

  return (
    <div className="todo-list">
      <Todo
        categoryName={props.categoryName}
        todos={todos}
        completeTodos={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        categoryToDisplay="All"
        handleTodoClick={handleTodoClick}
        changeTodoName={changeTodoName}
        categories={props.categories} changeCategories={props.changeCategories}

        categoryChange={handleCategoryChange}
      />
      <TodoForm onSubmit={addTodo} categoryName={props.categoryName} />
    </div>
  );

   function handleCategoryChange(id, value)
   {
        console.log("RecievedElement");
   }

}

export default TodoList;
