import './App.css';
import {useState, useRef} from 'react';
import TodoCategories from './components/TodoCategories';
import TodoList from './components/TodoList';
import SearchDate from './components/SearchDate';

function App() {

  let dateToday = (new Date()).toLocaleDateString('en-us',
  {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  });

  let [selectedTodoStateVer, changeSelectedTodo] = useState(0);
  let [categoryName,setCategory] = useState('None');

  const [categories, changeCategories] = useState([
    {
      id: Math.floor(Math.random()*10000 + 1),
      name: 'Category 1'
    },
    {
      id: Math.floor(Math.random()*10000 + 1),
      name: 'Category 2'
    }
  ]);



  let todayTime = (new Date()).getHours() + ':' + (new Date()).getMinutes();


  const changeActiveCategory = (newCategoryName) =>
  {
      let Categories = document.getElementsByClassName('Category');


      for(let i = 1; i<= Categories.length; i++)
      {
        Categories[i-1].classList.remove('Selected');
      }

      document.getElementById(newCategoryName).classList.add('Selected');

      setCategory(newCategoryName);
      if(categoryName !== newCategoryName)
      {
        changeSelectedTodo(old => '');
      }
  }
  
  let glassWindow = useRef();

  

  return (
    <div className='todo-app'>
      <div ref={glassWindow} id="inner-window-id" className="inner-window">
        <div className="headerDiv">{dateToday}</div>
        <TodoCategories categories={categories} changeCategories={changeCategories} handleClickCategory={changeActiveCategory}/>
        <TodoList categoryName={categoryName} categories={categories} changeCategories={changeCategories} changeSelectedTodo={changeSelectedTodo} category = {categoryName}/>
      </div>
      <div className='circle1'></div> 
      <div className='circle2'></div>
    </div>
  );
}

export default App;
