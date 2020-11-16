import todos from './data.js';
import TodoList from './modules/TodoList.js';





new TodoList({
  el: "#app",
  todos, //pas besoin de todos:todos car 2x même chose
}); 
