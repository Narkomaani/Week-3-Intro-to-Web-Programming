const tableBody = document.getElementById("table-body");
const tableHeader = document.getElementById("table-header")

/*
  This code expects every table to have matching values in the same order and if that
  order would change the data would be incorrect. Better way todo this is to use
  the areas key to get the right data in the right place. but this works so idc
*/
async function getTable() {
  const url = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const tablePromise = await fetch(url);
  const tableJson = await tablePromise.json();
  let labels = Object.values(tableJson.dataset.dimension.Alue.category.label);

  // set header to the label from database
  // tableHeader.innerText = tableJson.dataset.label;

  // now that i've found the object.values u could use forEach but this already works
  for (let i = 0; i < tableJson.dataset.value.length; i++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");

    td1.innerText = labels[i];
    td2.innerText = tableJson.dataset.value[i];

    tr.appendChild(td1);
    tr.appendChild(td2);
    tableBody.appendChild(tr);
  }
}

async function addEmployees() {
  const url = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  const tablePromise = await fetch(url);
  const tableJson = await tablePromise.json();
  const employees = tableJson.dataset
  let i = 0

  Array.from(tableBody.children).forEach((row)=> {
    let td = document.createElement("td");

    td.innerText = employees.value[i]
    i++;
    row.appendChild(td)
  })
}

getTable();
addEmployees();
