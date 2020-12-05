import Todo from "./Todo.js";
import todoListTemplate from "./templates/todoList.js";
import todo from "./templates/todo.js";

export default class TodoList {
  constructor(data) {
    this.el = document.querySelector(data.el);
    this.listEl;
    this.notCompletedNumber;
    this.todos = []; // tableau d'éléments todo
    this.loadTodos(data.todos);
    this.template = todoListTemplate;
    this.render(this.todos);
  }

  /***
   * Remplissage de this.todos avec toutes nos todo
   */
  loadTodos(todos) {
    for (const todo of todos) {
      this.todos.push(new Todo({ parent: this, todo }));
    }
  }

  /**
   * Rendu du TodoList
   * @return {[type]}
   */
  render(todos) {
    this.el.innerHTML = this.template;
    //L'élément .todo-list existe pour le navigateur
    this.listEl = this.el.querySelector(".todo-list"); //on l'ajouter car il n'existe pas dans le html, juste dans le render
    for (let todo of todos) {
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
    this.notCompletedNumber = this.todos.filter((todo) => todo.completed === false).length; //2 dans notre cas
    this.el.querySelector(".todo-count strong").textContent = this.notCompletedNumber;
  }

  /**
   * Ajout d'un todo
   */
  addTodo() {
    const content = this.el.querySelector(".new-todo").value;
    // const id = this.todos[this.todos.length - 1].id + 1; // prof
    const id = this.todos.length + 1; //perso
    const newTodo = new Todo({ parent: this, todo: { id, content, completed: false } });
    this.todos.push(newTodo);
    newTodo.render();
    this.el.querySelector(".new-todo").value = ""; // on vide l'input de sa valeur
    // this.setNotCompletedNumber(); perso pas prof
  }

  /**
   * Suppresion d'un élément du tab this.todos
   */
  removeOneById(id) {
    this.todos = this.todos.filter((el) => el.id != id);
  }

  /**
   * Suppresion des todos completed
   */
  removeAllCompleted() {
    //On supprime les todos completed du tableau this.todos
    this.todos = this.todos.filter((todo) => !todo.completed);
    //On affiche les todos du tableau this.todos
    this.render(this.todos);
  }

  /**
   * Complete les todos qui ne sont pas encore completed
   */
  _completeAll() {
    const notCompleted = this.todos.filter((todo) => !todo.completed);
    for (const todo of notCompleted) {
      todo._toggleCompleted();
    }
  }

  /**
   * Filtrage des todos selon le filtre
   */
  _filter(filter) {
    switch (filter) {
      case "active":
        this.render(this.todos.filter((todo) => !todo.completed));
        break;
      case "completed":
        this.render(this.todos.filter((todo) => todo.completed));
        break;
      default:
        this.render(this.todos);
        break;
    }
  }

  /**
   * Activation des éléments interactifs de la TodoList
   */
  activerBtns() {
    //Activation de l'input .new-todo
    this.el.querySelector(".new-todo").addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        this.addTodo();
      }
    });

    //Activation des .filter
    let filterBtns = this.el.querySelectorAll(".filter");
    for (let filterBtn of filterBtns) {
      filterBtn.addEventListener("click", () => {
        this._filter(filterBtn.dataset.filter);
      });
    }

    //Activation de .clear-completed
    this.el.querySelector(".clear-completed").addEventListener("click", () => {
      this.removeAllCompleted();
    });

    //Activation de .toggle-all
    this.el.querySelector(".toggle-all").addEventListener("click", () => {
      this._completeAll();
    });
  }
}
