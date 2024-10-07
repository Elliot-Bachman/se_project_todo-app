class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete();
      this._todoElement.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed; //toggle completed state
      this._handleCheck(this._data.completed); // call checkbox handler
    });
  }

  generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
  }

  // Generate and display the date element
  generateDateEl() {
    this._todoDateEl = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      const formattedDate = dueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      // Set the formatted date in the date element
      this._todoDateEl.textContent = `Due: ${formattedDate}`;
    } else {
      // If no date, display a default message
      this._todoDateEl.textContent = "No due date set";
    }
  }

  getView() {
    // Clone the todo template and assign to _todoElement
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    // Set the name of the todo item
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    todoNameEl.textContent = this._data.name;

    this.generateCheckboxEl();
    this.generateDateEl();

    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
