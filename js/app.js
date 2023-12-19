import {rollDice} from "./rollDice.js";

function checkedValue(elementId) {
  const elements = document.getElementsByName(elementId)
  let checkedElement;
  for (let element of elements) {
    if (element.checked) {
      checkedElement = element;
      break;
    }
  }
  return checkedElement.value;
}

function getCheckedValues(name) {
  const elements = document.getElementsByName(name)
  const rerolls = [];
  for (let element of elements) {
    if (element.checked) {
      rerolls.push(parseInt(element.value))
    }
  }
  return rerolls;
}

function processFormSubmit(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  const amount = document.getElementById("diceAmount").value;
  const successThreshold = checkedValue("successThreshold");
  const doubleThreshold = checkedValue("doubleThreshold");
  const reroll = getCheckedValues("reroll")
  const infiniteRerolls = document.getElementById("infinite-rerolls").checked;
  rollDice(parseInt(amount, 10), parseInt(successThreshold, 10), parseInt(doubleThreshold, 10), reroll, infiniteRerolls);
  return false;
}

window.addEventListener("load", () => {
  const form = document.getElementById('form');
  form.addEventListener("submit", processFormSubmit);
  const amountInput = document.getElementById("diceAmount")
  amountInput.addEventListener("keyup", (event) => {
    if (Number.isInteger(parseInt(event.target.value))) {
      const submitButton = document.getElementById("submit-button");
      submitButton.textContent = `Heitä ${event.target.value} noppaa`;
    }
  })
})
