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
    td1.style.padding = "6px";
    td1.style.borderBottom = "1px solid gray";
    let td2 = document.createElement("td");
    td2.style.padding = "6px";
    td2.style.borderBottom = "1px solid gray";

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
    td.style.padding = "6px";
    td.style.borderBottom = "1px solid gray";

    td.innerText = employees.value[i]
    row.appendChild(td)

    i++;
  })
}

function addPercentage() {
  Array.from(tableBody.children).forEach((row)=> {
    let td = document.createElement("td");
    td.style.padding = "6px";
    td.style.borderBottom = "1px solid gray";

    let percentage = (row.children[2].innerText/row.children[1].innerText)*100

    td.innerText = percentage.toFixed(2)+"%"

    if (percentage > 45) {
      row.style.backgroundColor = "#abffbd";
    } else if (percentage < 25) {
      row.style.backgroundColor = "#ff9e9e";
    }

    row.appendChild(td)
  })
}


async function main() {
  try {
	await getTable();
	await addEmployees();
	addPercentage()

  }catch(error) {
  	console.log("Error:" + error.message);
  }
}

main();


