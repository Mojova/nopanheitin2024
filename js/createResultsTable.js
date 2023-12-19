export function createResultsTable() {
  let resultsTable = document.getElementById('results-table');
  if (!resultsTable) {
    resultsTable = document.createElement("table")
    resultsTable.id = 'results-table';
    const thead = document.createElement("thead")
    thead.id = "table-head";
    const headerRow = document.createElement('tr');
    thead.append(headerRow);
    const header1 = document.createElement("th");
    header1.textContent = "Noppa";
    const header2 = document.createElement("th");
    header2.textContent = "Tulos";
    resultsTable.append(thead);
    headerRow.append(header1, header2);
    const main = document.getElementById('main');
    main.append(resultsTable);
  }
  return resultsTable;
}
