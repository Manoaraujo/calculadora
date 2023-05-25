class Calculator {
  constructor(previousText, currentText) {
    this.previousText = previousText
    this.currentText = currentText
    this.clear()
  }
  clear() {
    this.previousOperand = ""
    this.currentOperand = ""
    this.operation = undefined
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === "," && this.currentOperand.includes(",")) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return
    if (this.currentOperand !== "") {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ""
  }
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "*":
        computation = prev * current
        break
      case "÷":
        computation = prev / current
        break
      default:
        return
    }

    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ""
  }

  getDisplayNumber(number) {
    const stringNUmber = number.toString()
    const intergerDigits = parseFloat(stringNUmber.split(".")[0])
    const decimalDigits = stringNUmber.split(",")[1]
    let intergerDisplay
    if (isNaN(intergerDigits)) {
      intergerDisplay = ""
    } else {
      intergerDisplay = intergerDigits.toLocaleString("pt-br", {
        style: "decimal",
        minimumFractionDigits: 0,
      })
    }
    if (decimalDigits != null) {
      return `${intergerDisplay},${decimalDigits}`
    } else {
      return intergerDisplay
    }
  }
  updateDisplay() {
    this.currentText.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )}${this.operation}`
    } else {
      this.previousText.innerText = ""
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const acButton = document.querySelectorAll("[data-all-clear]")
const deleteButton = document.querySelectorAll("[data-delete]")
const equalButton = document.querySelectorAll("[data-equal]")
const previousText = document.querySelector("[data-previous-term]")
const currentText = document.querySelector("[data-current-term]")

const myCalculator = new Calculator(previousText, currentText)

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    myCalculator.appendNumber(button.innerText)
    myCalculator.updateDisplay()
  })
})
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    myCalculator.chooseOperation(button.innerText)
    myCalculator.updateDisplay()
  })
})

equalButton.forEach((button) => {
  button.addEventListener("click", () => {
    myCalculator.compute()
    myCalculator.updateDisplay()
  })
})

deleteButton.forEach((button) => {
  button.addEventListener("click", () => {
    myCalculator.delete()
    myCalculator.updateDisplay()
  })
})
acButton.forEach((button) => {
  button.addEventListener("click", () => {
    myCalculator.clear()
    myCalculator.updateDisplay()
  })
})
