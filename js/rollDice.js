import {createResultsTable} from "./createResultsTable.js";

function d10() {
    return Math.floor(Math.random() * 10 + 1);
}

function rollDie(rerollValues, doReroll) {
    const result = d10();
    if (!rerollValues.includes(result)) {
        return [result];
    }
    if (doReroll) {
        return [result, ...rollDie(rerollValues, true)];
    }
    return [result, d10()];
}

function createTextContent(result) {
    return result.reduce((accumulator, currentValue) => {
        if (!accumulator) {
            return `${currentValue}`;
        }
        return `${accumulator} → ${currentValue}`;
    }, '')
}

export function rollDice(amount, successThreshold, doubleThreshold, reroll, infiniteRerolls) {
    if (!Number.isInteger(amount)) {
        return false;
    }
    const results = [];
    for (let i = 0; i < amount; i++) {
        results.push(rollDie(reroll, infiniteRerolls));
    }

    const successes = results.reduce((accumulator, currentValue) => {
        const finalValue = currentValue.at(-1);
        if (finalValue >= successThreshold) {
            accumulator++;
        }
        if (finalValue >= doubleThreshold) {
            accumulator++;
        }
        return accumulator;
    }, 0);
    const damage = results.reduce((accumulator, currentValue) => {
        const finalValue = currentValue.at(-1);
        if (finalValue >= successThreshold) {
            accumulator++;
        }
        return accumulator;
    }, 0);
    let resultsElement = document.getElementById('results')
    if (!resultsElement) {
        resultsElement = document.createElement("p")
        resultsElement.id = 'results';
        const main = document.getElementById('main');
        main.append(resultsElement);
    }
    const finalResults = results.map(r => r.at(-1));
    if (successes === 0 && finalResults.includes(1)) {
        const ones = finalResults.filter(r => r === 1);
        resultsElement.textContent = `Botch! ${ones.length} ykköstä!`;
    } else {
        resultsElement.textContent = `${successes} onnistumista! ${damage} vahinkoa!`
    }

    createResultsTable();

    const resultRows = results.map((result, index) => {
        const row = document.createElement("tr");
        const indexCell = document.createElement("td");
        indexCell.textContent = `${index + 1}.`;
        const valueCell = document.createElement("td");
        valueCell.textContent = createTextContent(result);
        const finalResult = result.at(-1);
        if (finalResult === 1) {
            valueCell.className = 'botch';
        } else if (finalResult >= successThreshold && finalResult < doubleThreshold) {
            valueCell.className = "success";
        } else if (finalResult >= doubleThreshold) {
            valueCell.className = "doubleSuccess";
        }
        row.append(indexCell, valueCell);
        return row;
    });
    const oldResults = document.getElementById("table-body")
    if (oldResults) {
        oldResults.remove();
    }
    const newResults = document.createElement("tbody");
    newResults.id = "table-body";
    newResults.append(...resultRows);
    const table = document.getElementById("results-table");
    table.append(newResults);
}
