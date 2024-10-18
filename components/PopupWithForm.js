import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit; // Save handleFormSubmit
    this._formElement = this.popupElement.querySelector(".popup__form");
    this._inputList = this._formElement.querySelectorAll(".popup__input"); // Move inputList to constructor
  }

  // Collect all input values
  _getInputValues() {
    const inputValues = {}; // Fixed typo from Inputvalues to inputValues
    this._inputList.forEach((input) => {
      // Correct arrow function syntax
      // Add a key-value pair for each input
      inputValues[input.name] = input.value; // Use bracket notation for key
    });
    return inputValues;
  }

  // Override setEventListeners to also handle form submission
  setEventListeners() {
    super.setEventListeners(); // Inherit the close button functionality

    // Add form submit handling
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues(); // Get form input values
      this._handleFormSubmit(inputValues); // Pass input values to the submission handler
      this.close(); // Close the popup after submission
    });
  }
}

export default PopupWithForm;
