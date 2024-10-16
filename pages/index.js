import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import formValidator from "../components/FormValidator.js";
import Section from "../../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"]; // Improved form selection
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// instantiation of Section class
const todoSection = new Section({
  items: [], // pass initial odos
  renderer: () => {},
  // generate todo item
  // add it to the todo list
  // Refer to the forEach loop in this file
  containerSelector: ".todos__list",
});

// call section instance`s renderItems method

// Function to handle closing the popup with the Escape key
const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    closeModal(addTodoPopup); // Close the popup when Esc is pressed
  }
};

// Function to open the modal and add the keydown event listener
const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscClose); // Add event listener for Escape key
};

// Function to close the modal and remove the keydown event listener
const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscClose); // Remove event listener for Escape key
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    (isChecked) => {
      console.log(`Checkbox state changed: ${isChecked}`);
    },
    () => {
      console.log("Delete button clicked");
    }
  );
  const todoElement = todo.getView();
  return todoElement;
};

// event listener to open the "add todo" popup
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

// event listener to close the popup
addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

// event listener to handle form submission
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };

  const todo = generateTodo(values);
  todosList.append(todo); // Use add item method

  closeModal(addTodoPopup); // Close the modal after submission

  // Call resetValidation after successful submission
  newTodoValidator.resetValidation(); // Reset form validation after submission
});

// Render initial todos // Remove later Use add item method
initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

// Enable form validation
const newTodoValidator = new formValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
