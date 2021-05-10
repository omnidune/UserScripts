// ==UserScript==
// @name         FBA Mod
// @namespace    https://raw.githubusercontent.com/omnidune/UserScripts/master/FBA.js
// @version      0.4
// @description  FBA Page Mod
// @author       Raj
// @match        https://sellercentral.amazon.com/gp/fba/*
// @downloadURL  https://raw.githubusercontent.com/omnidune/UserScripts/master/FBA.js
// @grant        none
// ==/UserScript==

function generateTable() {
    document.querySelector("#intro_message").innerHTML += "<br><br>";
    var table = document.createElement("table");
    document.querySelector("#intro_message").appendChild(table);
    let cell;
    let element;
    for (let index = 0; index < 50; index++) {
        let row = table.insertRow();
        cell = row.insertCell();
        element = document.querySelectorAll("#shipment-name-container > kat-link > a")[0];
        cell.appendChild(element);
        
        cell = row.insertCell();
        element = document.querySelectorAll('#shipment_id_text')[index];
        cell.appendChild(element);
        
        cell = row.insertCell();
        element = document.querySelectorAll('#content-row > kat-table-cell:nth-child(2) > div:nth-child(1)')[index];
        cell.appendChild(element);
        
        cell = row.insertCell();
        element = document.querySelectorAll('#content-row > kat-table-cell:nth-child(3) > div:nth-child(1)')[index];
        cell.appendChild(element);
        
        cell = row.insertCell();
        element = document.querySelectorAll('#numeric-cell > kat-link > a')[0];
        cell.appendChild(element);
        
        cell = row.insertCell();
        element = document.querySelectorAll('#numeric-cell > div:nth-child(1)')[2];
        cell.appendChild(element);

        cell = row.insertCell();
        element = document.querySelectorAll('#received_quantity_text')[index];
        cell.appendChild(element);

        cell = row.insertCell();
        element = document.querySelectorAll('#content-row > kat-table-cell:nth-child(4)')[index];
        cell.appendChild(element);

        cell = row.insertCell();
        element = document.querySelectorAll('#content-row > kat-table-cell:nth-child(6) > kat-badge > span')[0];
        cell.appendChild(element);
    }
}

function mark() {
    var elementLengh = document.querySelectorAll("#content-row").length;

    for (var i = 0; i <= elementLengh; i++) {
        var a = document.querySelectorAll('#numeric-cell > div:nth-child(1)')[i + 2].textContent;
        var b = document.querySelectorAll("#received_quantity_text")[i].textContent;
        //console.log(a, b);
        if (a - b > 0) {
            document.querySelectorAll("#content-row")[i].style.background = "#ffa1a1";
        }
    }
}

var existCondition = setInterval(function() {
    if (document.querySelector("#filter-export-container")) {
        clearInterval(existCondition);
        var button = document.createElement("button");
        button.innerHTML = "Generate HTML Table";

        var body = document.querySelector("#filter-export-container");
        body.appendChild(button);

        button.addEventListener("click", generateTable);

        /////////////////////////////////////////
        button = document.createElement("button");
        button.innerHTML = "Mark Discrepant Shipments";

        body = document.querySelector("#filter-export-container");
        body.appendChild(button);
        button.addEventListener("click", mark);
    }
}, 100);
