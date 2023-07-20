const tableBody = document.getElementById("table-body");
const tableHeader = document.getElementById("table-header")

async function getTable() {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const tablePromise = await fetch(url);
  const tableJson = await tablePromise.json();
  let labels = Object.values(tableJson.dataset.dimension.Alue.category.label);

  // set header to the text from database
  console.log(tableJson.dataset);
  tableHeader.innerText = tableJson.dataset.label;

  // now that i found the object.values u could use forEach but this already works
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

getTable();
