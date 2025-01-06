const container = document.querySelector(".container") as HTMLInputElement;
const display = document.getElementById("display") as HTMLInputElement;
const historyList = document.getElementById("history") as HTMLElement;
const memoryList = document.getElementById("memory") as HTMLElement;

let memory:number = 0;
let historyOf:string[] = [];    
let string = "";
let displayValue  = display.value;

container.addEventListener("click", (e:MouseEvent) => {
  const buttonValue : string = (e.target as HTMLButtonElement).value;

  if (buttonValue === "C") {
    displayValue = "0";
  } else if (buttonValue === "BACK") {
    displayValue = displayValue.slice(0, -1) || "0";
  } else if (buttonValue === "=") {
    let result = displayValue;
    if (result === "") {
      return;
    }

    if (result.includes("ln")) {
      if (result.includes("ln(")) {
        const number  = parseFloat(
          result.replace(/ln\(([^)]+)\)/g, (match, p1):string=> {
            return Math.log(parseFloat(p1)).toString();
          })
        );
        displayValue = number.toString();
        return;
      }
    }

    if (result.includes("log")) {
      const number = parseFloat(
        result.replace(/log\(([^)]+)\)/g, (match:string, p1:string):string => {
          return Math.log10(parseFloat(p1)).toString();
        })
      );
      displayValue = number.toString();
      return;
    }

    if (result.includes("sin")) {
      const number = parseFloat(
        result.replace(/sin\(([^)]+)\)/g, (match:string, p1:string):string => {
          return Math.sin(parseFloat(p1)).toString();
        })
      );
      displayValue = number.toString();
      return;
    }

    if (result.includes("cos")) {
      const number = parseFloat(
        result.replace(/cos\(([^)]+)\)/g, (match:string, p1:string):string => {
          return Math.cos(parseFloat(p1)).toString();
        })
      );
      displayValue = number.toString();
      return;
    }

    if (result.includes("tan")) {
      const number = parseFloat(
        result.replace(/tan\(([^)]+)\)/g, (match:string, p1:string):string => {
          return Math.tan(parseFloat(p1)).toString();
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
      historyOf.push(`${result} = ${evaluatedResult}`);
      updateHistory();
    } catch (error) {
      displayValue = "Error";
    }
  } else {
    switch (buttonValue) {
      case "Pi":
        displayValue =
          displayValue === "" ? (Math.PI).toString() : (parseFloat(displayValue) * Math.PI).toString();
        break;

      case "e":
        displayValue =
          displayValue === "" ? (Math.E).toString(): (parseFloat(displayValue) * Math.E).toString();
        break;

      case "n!":
        displayValue += "!";
        break;

      case "square":
        displayValue = (Math.pow(parseFloat(displayValue), 2)).toString();
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
        historyOf = [];
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
  historyList.innerHTML = `History: ${historyOf.join("<br>")}`;
  memoryList.innerText = `Memory: ${memory}`;
});

function updateHistory() {
  historyList.innerHTML = "";
  historyOf.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function factorial(n:number):number {
  if (n < 0) {
    throw new Error("ERROR");
  }
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

function exponentiate(base:number, exponent:number):number {
  return Math.pow(base, exponent);
}
