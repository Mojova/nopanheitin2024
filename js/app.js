import {rollDice} from "./rollDice.js";
import {stringCalculator} from "./stringCalculator.js";

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
    const rawAmount = document.getElementById("diceAmount").value;
    const amount = stringCalculator(rawAmount);
    const successThreshold = checkedValue("successThreshold");
    const doubleThreshold = checkedValue("doubleThreshold");
    const reroll = getCheckedValues("reroll")
    const infiniteRerolls = document.getElementById("infinite-rerolls").checked;
    rollDice(amount, parseInt(successThreshold, 10), parseInt(doubleThreshold, 10), reroll, infiniteRerolls);
    return false;
}

function getButtonText(amount) {
    if (Number.isInteger(amount)) {
        if (amount === 1) {
            return `Heitä 1 noppa`;
        }
        return `Heitä ${amount} noppaa`;
    }
    return `Heitä`;
}

window.addEventListener("load", () => {
    const form = document.getElementById('form');
    form.addEventListener("submit", processFormSubmit);
    const amountInput = document.getElementById("diceAmount")
    amountInput.addEventListener("keyup", (event) => {
        const submitButton = document.getElementById("submit-button");
        const amount = stringCalculator(event.target.value);
        submitButton.textContent = getButtonText(amount);

    })
})
