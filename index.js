let buyDrinkList = document.getElementById("buyDrinkList");
let ownDrinkList = document.getElementById("ownDrinkList");
let colaList = document.getElementsByClassName("cola");

let balance = document.getElementById("balance");
let deposit = document.getElementById("deposit");
let have = document.getElementById("have");

const returnButton = document.getElementById("returnButton");
const depositButton = document.getElementById("depositButton");
const buyButton = document.getElementById("buyButton");

// origin, violet, yellow, cool, green, orange
let colaCount = [0, 0, 0, 0, 0, 0];

for(let i = 0; i<colaList.length; i++){
    colaList[i].onclick = function(){
        colaCount[i]++;
        this.style.boxShadow = "0 0 0 3px #6327FE";
        // 콜라 개수로 리스트의 buyColaCount 변수를 바꿔주면 됨
    }
}

returnButton.onclick = returnMoney;
depositButton.onclick = depositMoney;
buyButton.onclick = buyDrink;

function buyDrink(){
    for(let i = 0; i<buyDrinkList.childElementCount; i++){
        let drink = buyDrinkList.children[i].cloneNode(true);
        ownDrinkList.appendChild(drink);
    }
}

function returnMoney(){
    have.innerHTML = balance.innerHTML;
    balance.innerHTML = "0";
}

function depositMoney(){
    if(parseInt(have.innerHTML) > parseInt(deposit.value)){
        balance.innerHTML = parseInt(balance.innerHTML)+parseInt(deposit.value);
        have.innerHTML = parseInt(have.innerHTML) - parseInt(deposit.value);
        deposit.value = "";
    }
}

// function total(){
//     for(let i = 0; i<ownDrinkList.childElementCount; i++){
//         ownDrinkList.children[i].
//     }
// }
