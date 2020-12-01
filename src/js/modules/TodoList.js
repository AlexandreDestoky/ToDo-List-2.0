import Todo from "./Todo.js";
import todoListTemplate from "./templates/todoList.js";
import todo from "./templates/todo.js";

export default class TodoList {
  constructor(data) {
    this.el = document.querySelector(data.el);
    this.listEl;
    this.notCompletedNumber;
    this.todos = [];
    this.loadTodos(data.todos);
    this.template = todoListTemplate;
    this.render();
  }

  loadTodos(todos) {
    for (const todo of todos) {
      this.todos.push(new Todo({ parent: this, todo }));
    }
  }
  
  /**
   * Rendu du TodoList
   * @return {[type]}
   */
  render() {
    this.el.innerHTML = this.template;
    //L'élément .todo-list existe pour le navigateur
    this.listEl = this.el.querySelector(".todo-list"); //on l'ajouter car il n'existe pas dans le html, juste dans le render
    for (let todo of this.todos) {
      todo.render();
    }

    //calcul du nombre de todo not completed
    this.setNotCompletedNumber();
    // Activation des éléments interactifs
    this.activerBtns();
  }

  /**
   * Nombres de todo not completed
   */
  setNotCompletedNumber() {
    //renvoie le nombre de non completé
    this.notCompletedNumber = this.todos.filter((todo) => todo.completed === false).length;
    this.el.querySelector(".todo-count strong").textContent = this.notCompletedNumber;
  }


  /**
   * Ajout d'un todo
   */
  addTodo() {
    const content = this.el.querySelector(".new-todo").value;
    const id = this.todos[this.todos.length - 1].id + 1;
    const newTodo = new Todo({ parent: this, todo : { id, content, completed: false } });
    this.todos.push(newTodo);
    newTodo.render();
    this.el.querySelector(".new-todo").value = "";
  }

  /**
   * Activation des éléments interactifs de la TodoList
   */
  activerBtns() {
    //Activation de l'input .new-todo
    this.el.querySelector(".new-todo").onkeyup = (e) => {
      if (e.key == "Enter") {
        this.addTodo();
      }
    };
  }
}
