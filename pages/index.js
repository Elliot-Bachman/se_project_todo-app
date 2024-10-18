import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import formValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  // Decrement total tasks and pass the completed status
  todoCounter.updateTotal(false, completed); // Decrement total tasks and completed count if necessary
  console.log(
    `Task deleted. Current total: ${todoCounter._total}, Completed: ${todoCounter._completed}`
  );
}
// If no tasks remain, reset the counters
if (todoCounter._total === 0) {
  todoCounter._completed = 0;
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name; // Get the task name from the form input
    const dateInput = inputValues.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    // Generate unique ID for the new todo
    const id = uuidv4();

    // Create a new todo object
    const newTodo = { name, date, id, completed: false }; // New tasks are always incomplete

    // Generate a todo element using the Todo class
    const todoElement = generateTodo(newTodo);

    // Use Section's addItem method to add the new todo to the list
    todoSection.addItem(todoElement);

    // Update the total number of tasks (increment counter)
    todoCounter.updateTotal(true);
    console.log(
      `Task added. Current total: ${todoCounter._total}, Completed: ${todoCounter._completed}`
    );
  },
});

addTodoPopup.setEventListeners();

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    (isChecked) => {
      console.log(`Checkbox state changed: ${isChecked}`);
      handleCheck(isChecked); // Call the checkbox handler
    },
    (isDeleted) => {
      console.log("Delete button clicked");
      handleDelete(isDeleted); // Call the delete handler
    }
  );
  return todo.getView(); // Return the generated todo element
};

// Instantiate the Section class and pass initial todos and the renderer
const todoSection = new Section({
  items: initialTodos, // Pass initial todos
  renderer: (item) => {
    const todoElement = generateTodo(item); // Generate todo item
    todoSection.addItem(todoElement); // Add it to the todo list using addItem
  },
  container: ".todos__list",
});

// Call section instance's renderItems method to render initial todos
todoSection.renderItems();

// event listener to open the "add todo" popup
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open(); // This will open the popup when the button is clicked
});

// Enable form validation
const newTodoValidator = new formValidator(
  validationConfig,
  document.forms["add-todo-form"]
);
newTodoValidator.enableValidation();
