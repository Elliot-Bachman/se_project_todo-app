class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length; // Calculate completed todos
    this._total = todos.length; // Total todos
    this._updateText();
    console.log(
      `Initial state: ${this._completed} out of ${this._total} completed`
    );
  }

  // Call this when a checkbox is clicked, and when a completed to-do is deleted.
  updateCompleted(increment) {
    // Increment or decrement the completed count
    this._completed += increment ? 1 : -1;

    // Ensure completed count does not go below 0 or exceed total
    if (this._completed < 0) {
      this._completed = 0;
    }
    if (this._completed > this._total) {
      this._completed = this._total;
    }

    console.log(
      `After updateCompleted: ${this._completed} out of ${this._total}`
    );
    this._updateText();
  }

  // Call this when a to-do is created via the form or deleted
  updateTotal(increment, wasCompleted = false) {
    // Increment or decrement the total count
    this._total += increment ? 1 : -1;

    // Ensure total count does not go below 0
    if (this._total < 0) {
      this._total = 0;
    }

    // If no tasks remain, reset both total and completed counts
    if (this._total === 0) {
      this._completed = 0; // Reset completed count when no tasks remain
    }

    // If a task was completed before being deleted, update the completed count
    if (!increment && wasCompleted) {
      this.updateCompleted(false);
    }

    console.log(`After updateTotal: ${this._completed} out of ${this._total}`);
    this._updateText();
  }

  // Update the text content of the counter
  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
