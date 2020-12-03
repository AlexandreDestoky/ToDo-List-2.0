import todoTemplate from "./templates/todo.js";

export default class Todo {
  constructor(data) {
    this.parent = data.parent;
    this.el;
    this.id = data.todo.id;
    this.content = data.todo.content;
    this.completed = data.todo.completed;
    this.template = todoTemplate;
  }

  /**
   * met les données dans le template
   */
  _replaceInTemplate() {
    //je remplace les données statiques par les données du Todo
    for (let propriete in this) {
      this.template = this.template.replace(`{{${propriete}}}`, this[propriete]);
    }
    //Si c'est completed
    this.template = this.template.replace("{{isCompletedClass}}", this.completed == true ? "completed" : "");
    this.template = this.template.replace("{{isCompletedChecked}}", this.completed == true ? "checked=checked" : "");
  }

  render() {
    this._replaceInTemplate();
    this.el = document.createElement("div");
    this.el.innerHTML = this.template;
    this.parent.listEl.append(this.el);

    //activation des éléments interactifs de la Todo
    this._activerBtns();
  }

  /**
   * Activations des éléments intéractifs du Todo
   * detection cocher checkbox
   */
  _activerBtns() {
    //activation des .toggle
    this.el.querySelector(".toggle").addEventListener("change", () => {
      this._toggleCompleted();
    });

    //activation des .destroy
    this.el.querySelector(".destroy").addEventListener("click", () => {
      this._destroy();
    });
  }

  /**
   * inversion completed de todo
   */
  _toggleCompleted() {
    this.completed = !this.completed;
    this.el.querySelector("li").classList.toggle("completed");
    this.parent.setNotCompletedNumber();
  }

  /**
   * Suppression de l'élément
   */
  _destroy() {
    //suppression de l'élement
    this.el.remove();
    //fct parent (Todolist)
    this.parent.removeOneById(this.id);
  }
}
