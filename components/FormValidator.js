class formValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _checkInputValidity(inputElement) {
    console.log("Checking input validity for:", inputElement.id);
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    console.log("Error element found:", errorElement);

    if (!inputElement.validity.valid) {
      console.log("Input is invalid:", inputElement.validationMessage);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    } else {
      console.log("Input is valid");
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    }
  }

  _toggleButtonState() {
    console.log("Toggling button state...");
    const isFormInvalid = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );
    console.log("Form is invalid:", isFormInvalid);

    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );
    if (isFormInvalid) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    console.log("Setting event listeners...");
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    console.log("Input list:", this._inputList);

    this._toggleButtonState(); // Initial state check

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        console.log("Input changed:", inputElement.id);
        this._checkInputValidity(inputElement);
        this._toggleButtonState(); // Check button state on input
      });
    });
  }

  enableValidation() {
    console.log("Enabling validation...");
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default formValidator;
