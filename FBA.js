// ==UserScript==
// @name         FBA Discrepancy
// @namespace    https://raw.githubusercontent.com/omnidune/UserScripts/master/FBA.js
// @version      0.1
// @description  FBA Discrepancy detector
// @author       Raj
// @match        https://sellercentral.amazon.com/gp/fba/inbound-queue/index.html*
// @downloadURL  https://raw.githubusercontent.com/omnidune/UserScripts/master/FBA.js
// @grant        none
// ==/UserScript==

function f() {
    var elementLengh = document.getElementById('fba-inbound-queue-shipments-collection').getElementsByTagName('tr').length;


    for (var i = 1; i <= elementLengh; i++) {
        var a = document.querySelector("#fba-inbound-queue-shipments-collection > tr:nth-child(" + i + ") > td:nth-child(6)").textContent;
        var b = document.querySelector("#fba-inbound-queue-shipments-collection > tr:nth-child(" + i + ") > td:nth-child(7)").textContent;

        if (a - b > 0) {
            document.querySelector("#fba-inbound-queue-shipments-collection > tr:nth-child(" + i + ")").style.background = "#ffa1a1";
        }
    }
}

document.querySelector("#fba-inbound-queue-page").addEventListener("click", f);