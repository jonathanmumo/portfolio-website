const display = document.getElementById("display");

// Add value to display
function appendValue(value) {
  display.value += value;
}

// Clear display
function clearDisplay() {
  display.value = "";
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
  try {
    let expression = display.value;

    // Convert your UI symbols to real JavaScript operators
    expression = expression
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/−/g, "-");

    display.value = Function("return " + expression)();
  } catch (error) {
    display.value = "Error";
  }
}
