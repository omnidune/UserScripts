// ==UserScript==
// @name         Rakuten Enhancer
// @namespace    https://raw.githubusercontent.com/omnidune/UserScripts/master/Rakuten.js
// @version      0.3
// @description  This script adds filters to the inventory page, fixes the header from the inventory page of Rakuten on scroll.
// @author       Raj
// @match        https://smartfill.rakutensl.com/Inventory/index.aspx
// @downloadURL  https://raw.githubusercontent.com/omnidune/UserScripts/master/Rakuten.js
// @grant        none
// ==/UserScript==

function filterfunction() {
    var dropdowncatdata = document.querySelector("#category").value;
    var dropdowncartdata = document.querySelector("#carton").value;
    var rows = document.getElementsByTagName("table")[4].rows;
    for (let index = 1; index < rows.length; index++) {
        const row = rows[index];
        var cellcategory = row.cells[0];
        var cellcarton = row.cells[1];
        var cellinven = row.cells[4];
        var categorycelltext = cellcategory.textContent.trim();
        var cartoncelltext = cellcarton.textContent.trim();
        var cellinv = cellinven.textContent.trim();

        row.style.display = "revert";
        // resets the entire table first to remove any past filters

        if (dropdowncatdata=="--" && dropdowncartdata=="--") {
            // if both are kept blank (--) shows the whole list
            row.style.display = "revert";
        }
        if (dropdowncatdata!="--" && dropdowncatdata!=categorycelltext) {
            // if category is selected, hides the rest of the rows.
            row.style.display = "none";
        }
        if (dropdowncartdata!="--" && dropdowncartdata == "Yes" && !cartoncelltext.includes("CARTON") ) {
            // if carton filter is selected as yes, hides any row which does not have carton mentioned in SKU
            row.style.display = "none";
        }
        if (dropdowncartdata!="--" && dropdowncartdata == "No" && cartoncelltext.includes("CARTON") ) {
            // if carton filter is selected as no, hides any row which has CARTON mentioned in SKU
            row.style.display = "none";
        }
        if (document.querySelector("#togempty").checked && cellinv=="0"){
            // if the total number of available quantity is zero it'll  be not shown
            row.style.display = "none";
        }

    }

}

window.onload = function(){

    // fixes the top row of the table on scroll
    var headers = document.getElementsByTagName('th');
    for (var index = 0; index < headers.length; index++) {
        headers[index].style.background="#3657B0";
        headers[index].style.position="sticky";
        headers[index].style.top="0px";
    }
    ////////////////////////////////////////////////


    let category = new Set();
    var rows = document.getElementsByTagName("table")[4].rows;
    // making an array of all unique items under the Category column
    category.add("--"); //adding -- to be considered as blank string
    for (let index = 1; index < rows.length; index++) {
        const row = rows[index];
        var cell = row.cells[0];
        var data = cell.textContent.trim();
        category.add(data);
    }


    //////////////////////////////////////////////////////////
    // Creating the dropdown category element
    var selectcat = document.createElement("select");
    selectcat.name = "category";
    selectcat.id = "category";

    // Entering data to the select element dropdown
    for (const val of category) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val;
        selectcat.appendChild(option);
    }

    // Labeling dropdown
    var label = document.createElement("label");
    label.innerHTML = "Choose Category: ";
    label.htmlFor = "category";
    //////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////
    // Creating the dropdown carton element
    var selectcart = document.createElement("select");
    selectcart.name = "carton";
    selectcart.id = "carton";

    // Entering data to the select element dropdown
    for (const val of ["--","Yes","No"]) {
        option = document.createElement("option");
        option.value = val;
        option.text = val;
        selectcart.appendChild(option);
    }

    // Labeling dropdown
    var labelcart = document.createElement("label");
    labelcart.innerHTML = "Show Carton Quantity ";
    labelcart.htmlFor = "carton";
    //////////////////////////////////////////////////////////

    var togempty = document.createElement('input');
    togempty.type = "checkbox";
    togempty.name = "togempty";
    togempty.id = "togempty";
    var toglabel = document.createElement("label");
    toglabel.innerHTML = "Exclude Empty SKUs";
    toglabel.htmlFor = "togempty";

    document.querySelector("#content > div > div.contentSectionTitle").innerHTML+= "<br><br>";
    document.querySelector("#content > div > div.contentSectionTitle").appendChild(label).appendChild(selectcat);

    document.querySelector("#content > div > div.contentSectionTitle").innerHTML+= "<br><br>";
    document.querySelector("#content > div > div.contentSectionTitle").appendChild(labelcart).appendChild(selectcart);

    document.querySelector("#content > div > div.contentSectionTitle").innerHTML+= "<br><br>";
    document.querySelector("#content > div > div.contentSectionTitle").appendChild(toglabel).appendChild(togempty);
    //document.querySelector("#content > div > div.contentSectionTitle");
    document.querySelector("#content > div > div.contentSectionTitle").innerHTML+= "<br><br>";


}

document.querySelector("#content > div > div.contentSectionTitle").addEventListener("change", filterfunction);
// This above sets a trigger for filter function.

