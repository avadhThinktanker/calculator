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
  } else {
    switch (buttonValue) {
      case "Pi":
        displayValue =
          displayValue === "" ? Math.PI : parseFloat(displayValue) * Math.PI;
        break;

      case "e":
        displayValue =
          displayValue === "" ? Math.E : parseFloat(displayValue) * Math.E;
        break;

      case "n!":
        displayValue += "!";
        break;

      case "square":
        displayValue = Math.pow(parseFloat(displayValue), 2);
        break;

      case "log":
        displayValue += "log(";
        break;

      case "ln":
        displayValue += "ln(";
        break;

      case "sin":
        displayValue += "sin(";
        break;

      case "cos":
        displayValue += "cos(";
        break;

      case "tan":
        displayValue += "tan(";
        break;

      case "sec":
        displayValue += "sec(";
        break;

      case "csc":
        displayValue += "csc(";
        break;

      case "cot":
        displayValue += "cot(";
        break;

      case "tenpower":
        displayValue += "10^";
        break;

      case "M+":
        if (displayValue !== "0" && displayValue !== "") {
          memory += parseFloat(displayValue);
        }
        break;

      case "M-":
        if (displayValue !== "0" && displayValue !== "") {
          memory -= parseFloat(displayValue);
        }
        break;

      case "MC":
        memory = 0;
        break;

      case "MS":
        displayValue = "";
        break;

      case "HC":
        history = [];
        updateHistory();
        break;

      default:
        if (displayValue === "0" || displayValue === "") {
          displayValue = buttonValue;
        } else {
          displayValue += buttonValue;
        }
        break;
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
