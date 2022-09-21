// ==UserScript==
// @name         FBA Mod
// @namespace    https://raw.githubusercontent.com/omnidune/UserScripts/master/FBA.js
// @version      2.1
// @description  FBA Page Mod
// @author       Raj
// @match        https://sellercentral.amazon.com/gp/*
// @icon         https://www.google.com/s2/favicons?domain=amazon.com
// @downloadURL  https://raw.githubusercontent.com/omnidune/UserScripts/master/FBA.js
// @updateURL    https://raw.githubusercontent.com/omnidune/UserScripts/master/FBA.js
// @grant        none
// ==/UserScript==

function generateTable() {
    try {
        document.querySelector("#intro_message > table").remove()
    }
    catch {}
    
    var table = document.createElement("table");
    document.querySelector("#intro_message").appendChild(table);
    let cell;
    let element;
    //
    let matrix = document.querySelector("#main-table > kat-table > kat-table-body");
    //Search from the main table only, not the HTML table
    let length = matrix.querySelectorAll('[id=shipment-name-container]').length
    console.log(length)

    for (let index = 0; index < length; index++) {
        //
        let matrix = document.querySelector("#main-table > kat-table > kat-table-body");
        //Search from the main table only, not the HTML table
        //
        let row = table.insertRow();
        cell = row.insertCell();
        element = matrix.querySelectorAll('[id=shipment-name-container]')[index].cloneNode(true);
        cell.appendChild(element);
        //FBA Shipment Title/Link

        cell = row.insertCell();
        element = matrix.querySelectorAll('#shipment_id_text')[index].cloneNode(true);
        cell.appendChild(element);
        //FBA Shipment ID

        cell = row.insertCell();
        element = matrix.querySelectorAll('#content-row > kat-table-cell:nth-child(2) > div:nth-child(1)')[index].cloneNode(true);
        cell.appendChild(element);
        //Date Created

        cell = row.insertCell();
        element = matrix.querySelectorAll('#content-row > kat-table-cell:nth-child(3) > div:nth-child(1)')[index].cloneNode(true);
        cell.appendChild(element);
        //Last Updated

        cell = row.insertCell();
        element = matrix.querySelectorAll("#numeric-cell > kat-link")[index].cloneNode(true);
        cell.appendChild(element);
        //Number of SKUs

        cell = row.insertCell();
        element = matrix.querySelectorAll('#numeric-cell > div:nth-child(1)')[index].cloneNode(true);
        cell.appendChild(element);
        //Units Sent

        cell = row.insertCell();
        element = matrix.querySelectorAll('#received_quantity_text')[index].cloneNode(true);
        cell.appendChild(element);
        //Units Received

        cell = row.insertCell();
        element = matrix.querySelectorAll('#content-row > kat-table-cell:nth-child(4)')[index].cloneNode(true);
        cell.appendChild(element);
        //Ship to

        cell = row.insertCell();
        element = matrix.querySelectorAll("#content-row > kat-table-cell:nth-child(7) > kat-badge")[index].cloneNode(true);
        cell.appendChild(element);
        //Status

    }
}

function mark() {
    var elementLengh = document.querySelectorAll("#content-row").length;

    for (var i = 0; i <= elementLengh; i++) {
        var a = document.querySelectorAll('#numeric-cell > div:nth-child(1)')[i + 2].textContent.replace(",",""); //sent units
        var b = document.querySelectorAll("#received_quantity_text")[i].textContent.replace(",",""); //received units
        //console.log(a, b);
        document.querySelectorAll("#content-row")[i].style.background = "";
        if (a-b > 0) {
            document.querySelectorAll("#content-row")[i].style.background = "#ffa1a1";
        }
        if (a-b < 0) {
            document.querySelectorAll("#content-row")[i].style.background = "#99ccff";
        }
    }
}

var existCondition = setInterval(function() {
    if (document.querySelector("#tab-view > kat-box > div.content.tool-bar-container > div:nth-child(1)")) {
        clearInterval(existCondition);
        var button = document.createElement("button");
        button.innerHTML = "Generate HTML Table";

        var body = document.querySelector("#tab-view > kat-box > div.content.tool-bar-container > div:nth-child(1)");
        body.appendChild(button);

        button.addEventListener("click", generateTable);

        /////////////////////////////////////////
        button = document.createElement("button");
        button.innerHTML = "Mark Discrepant Shipments";

        body = document.querySelector("#tab-view > kat-box > div.content.tool-bar-container > div:nth-child(1)");
        body.appendChild(button);
        button.addEventListener("click", mark);
    }
}, 100);
