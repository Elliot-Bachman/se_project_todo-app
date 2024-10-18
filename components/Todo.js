class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    // When delete is clicked, update the completed and total counters before removing the element
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._todoElement.remove();
    });

    // Only call handleCheck when the checkbox is actually changed
    this._todoCheckboxEl.addEventListener("change", () => {
      // Ensure the checkbox state is toggled once
      this._data.completed = !this._data.completed;
      this._handleCheck(this._data.completed); // Call checkbox handler
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

  generateDateEl() {
    this._todoDateEl = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      const formattedDate = dueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      this._todoDateEl.textContent = `Due: ${formattedDate}`;
    } else {
      this._todoDateEl.textContent = "No due date set";
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    todoNameEl.textContent = this._data.name;

    this.generateCheckboxEl();
    this.generateDateEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
