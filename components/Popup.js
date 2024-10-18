class Popup {
  constructor({ popupSelector }) {
    this.popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this.popupElement.querySelector(".popup__close");

    // Bind the handleEscapeClose method to ensure "this" refers to the class instance
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  // Handle the Escape key press
  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close(); // Call the close method if the Escape key is pressed
    }
  }

  // Open the popup ancd listen for the Escape key
  open() {
    this.popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose); // Add escape key listener
  }

  // Close the popup and remove the Escape key listener
  close() {
    this.popupElement.classList.remove("popup_visible");
    console.log("close method called");
    document.removeEventListener("keyup", this._handleEscapeClose); // Remove escape key listener
  }

  // Set up event listeners for closing the popup via close button and modal background click
  setEventListeners() {
    this.popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup__close") || // Close button click
        evt.target.classList.contains("popup") // Background click
      ) {
        this.close(); // Close the popup
      }
    });
  }
}

export default Popup;
