class TodoCounter {
  constructor(todos, selector) {
    this.element = document.querySelector(selector); // No underscore
    this.completed = todos.filter((todo) => todo.completed).length; // No underscore
    this.total = todos.length; // No underscore
    this._updateText();
    console.log(
      `Initial state: ${this.completed} out of ${this.total} completed`
    );
  }

  updateCompleted(increment) {
    this.completed += increment ? 1 : -1;
    if (this.completed < 0) {
      this.completed = 0;
    }
    if (this.completed > this.total) {
      this.completed = this.total;
    }
    console.log(
      `After updateCompleted: ${this.completed} out of ${this.total}`
    );
    this._updateText();
  }

  updateTotal(increment, wasCompleted = false) {
    this.total += increment ? 1 : -1;
    if (this.total < 0) {
      this.total = 0;
    }
    if (!increment && wasCompleted) {
      this.updateCompleted(false);
    }
    if (this.total === 0) {
      this.completed = 0;
    }
    console.log(`After updateTotal: ${this.completed} out of ${this.total}`);
    this._updateText();
  }

  _updateText() {
    this.element.textContent = `Showing ${this.completed} out of ${this.total} completed`;
  }
}

export default TodoCounter;
