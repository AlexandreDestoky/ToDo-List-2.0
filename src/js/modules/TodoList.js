import Todo from "./Todo";
import todoListTemplate from "./templates/todoList.js";

export default class TodoList {
  constructor(data) {
    this.el = document.querySelector(data.el);
    this.todos = [];
    this.loadTodos(data.todos);
    this.template = todoListTemplate;
    this.render();
  }

  loadTodos(todos) {
    for (const todo of todos) {
      this.todos.push(new Todo(todo));
    }
  }
  render() {
    this.el.innerHTML = this.template;
  }
}
