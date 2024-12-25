const container = document.querySelector(".container");
const display = document.getElementById("display");
const historyList = document.getElementById("history");
const memoryList = document.getElementById("memory");

let memory = 0;
let history = [];
let string = "";
let displayValue = display.value;

container.addEventListener("click", (e) => {
  const buttonValue = e.target.value;

  if (buttonValue === "C") {
    displayValue = "0";
  } else if (buttonValue === "BACK") {
    displayValue = displayValue.slice(0, -1);
  } else if (buttonValue === "=") {
    let result = displayValue;
    if (result === "") {
      return;
    }

    if (result.includes("ln")) {
      if (result.includes("ln(")) {
        const number = parseFloat(
          result.replace(/ln\(([^)]+)\)/g, (match, p1) => {
            return Math.log(parseFloat(p1));
          })
        );
        displayValue = number.toString();
        return;
      }
    }

    if (result.includes("log")) {
      const number = parseFloat(
        result.replace(/log\(([^)]+)\)/g, (match, p1) => {
          return Math.log10(parseFloat(p1));
        })
      );
      displayValue = number.toString();
      return;
    }

    if (result.includes("sin")) {
      const number = parseFloat(
        result.replace(/sin\(([^)]+)\)/g, (match, p1) => {
          return Math.sin(p1);
        })
      );
      displayValue = number.toString();
      return;
    }

    if (result.includes("cos")) {
      const number = parseFloat(
        result.replace(/cos\(([^)]+)\)/g, (match, p1) => {
          return Math.cos(p1);
        })
      );
      displayValue = number.toString();
      return;
    }

    if (result.includes("tan")) {
      const number = parseFloat(
        result.replace(/tan\(([^)]+)\)/g, (match, p1) => {
          return Math.tan(p1);
        })
      );
      displayValue = number.toString();
      return;
    }

    if (result.includes("!")) {
      const number = parseInt(result.replace("!", ""));
      displayValue = factorial(number).toString();
      return;
    }

    if (result.includes("2√")) {
      displayValue = Math.sqrt(parseFloat(result.replace("2√", ""))).toString();
      return;
    }

    if (result.includes("^")) {
      const [base, exponent] = result.split("^");
      displayValue = exponentiate(
        parseFloat(base),
        parseFloat(exponent)
      ).toString();
      return;
    }

    try {
      let evaluatedResult = eval(result);
      displayValue = evaluatedResult.toString();
      history.push(`${result} = ${evaluatedResult}`);
      updateHistory();
    } catch (error) {
      displayValue = "Error";
    }
  } else if (buttonValue === "Pi") {
    displayValue =
      displayValue === ""
        ? Math.PI.toString()
        : (parseFloat(displayValue) * Math.PI).toString();
  } else if (buttonValue === "e") {
    displayValue =
      displayValue === ""
        ? Math.E.toString()
        : (parseFloat(displayValue) * Math.E).toString();
  } else if (buttonValue === "n!") {
    displayValue += "!";
  } else if (buttonValue === "square") {
    displayValue = Math.pow(parseFloat(displayValue), 2).toString();
  } else if (buttonValue === "log") {
    displayValue += "log(";
  } else if (buttonValue === "ln") {
    displayValue += "ln(";
  } else if (buttonValue === "sin") {
    displayValue += "sin(";
  } else if (buttonValue === "cos") {
    displayValue += "cos(";
  } else if (buttonValue === "tan") {
    displayValue += "tan(";
  } else if (buttonValue === "sec") {
    displayValue += "sec(";
  } else if (buttonValue === "csc") {
    displayValue += "csc(";
  } else if (buttonValue === "cot") {
    displayValue += "cot(";
  } else if (buttonValue === "Trigonometry") {
    displayValue += "";
  } else if (buttonValue === "tenpower") {
    displayValue += "10^";
  } else if (buttonValue === "Function") {
    displayValue += "";
  } else if (buttonValue === "M+") {
    if (displayValue === "0" || displayValue === "") {
      return;
    } else {
      memory += parseFloat(displayValue);
    }
  } else if (buttonValue === "M-") {
    if (displayValue === "0" || displayValue === "") {
      return;
    } else {
      memory -= parseFloat(displayValue);
    }
  } else if (buttonValue === "MC") {
    memory = 0;
  } else if (buttonValue === "MS") {
    displayValue = "";
  } else if (buttonValue === "HC") {
    history = [];
    updateHistory();
  } else {
    if (displayValue === "0" || displayValue === "") {
      displayValue = buttonValue;
    } else {
      displayValue += buttonValue;
    }
  }

  display.value = displayValue;
  historyList.innerHTML = `History: ${history.join("<br>")}`;
  memoryList.innerText = `Memory: ${memory}`;
});

function updateHistory() {
  historyList.innerHTML = "";
  history.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function factorial(n) {
  if (n < 0) {
    return "Error";
  }
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

function exponentiate(base, exponent) {
  return Math.pow(base, exponent);
}
