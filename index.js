let buyDrinkList = document.getElementById("buyDrinkList");
let ownDrinkList = document.getElementById("ownDrinkList");
let colaList = document.getElementsByClassName("cola");

let balance = document.getElementById("balance");
let deposit = document.getElementById("deposit");
let have = document.getElementById("have");
let total = document.getElementById("total");

const returnButton = document.getElementById("returnButton");
const depositButton = document.getElementById("depositButton");
const buyButton = document.getElementById("buyButton");


// origin, violet, yellow, cool, green, orange
// 콜라의 재고 (아직은 정확한 수치를 모름)
let colaCount = [0, 0, 0, 0, 0, 0];
// 자판기에서 획득한 콜라의 개수
let buyColaCount = [0, 0, 0, 0, 0, 0];
// 구매 후 획득한 음료 리스트에 들어가는 콜라의 개수
let ownColaCount = [0, 0, 0, 0, 0, 0];

let totalCount = 0;
for(let i = 0; i<colaList.length; i++){
    colaList[i].onclick = function(){
        // if 콜라 재고가 0개가 아닐 때
        // 클릭할 때마다 획득하는 콜라의 개수는 1 증가
        // 재고는 1 감소
        buyColaCount[i]++;
        colaCount[i]--;
        this.style.boxShadow = "0 0 0 3px #6327FE";
        // else
        // 품절 뜨게
    }
}


returnButton.onclick = returnMoney;
depositButton.onclick = depositMoney;
buyButton.onclick = buyDrink;

function buyDrink(){
    // for(let i = 0; i<buyDrinkList.childElementCount; i++){
    //     let drink = buyDrinkList.children[i].cloneNode(true);
    //     ownDrinkList.appendChild(drink);
    // }
    totalCount = 0;
    for(let i = 0; i<buyColaCount.length; i++){
        totalCount += buyColaCount[i];
        buyColaCount[i] = 0;
    }
    if(1000*totalCount<=parseInt(balance.innerHTML)){
        balance.innerHTML = parseInt(balance.innerHTML) - 1000*totalCount;
        total.innerHTML = parseInt(total.innerHTML)+1000*totalCount;
        for(let i = 0; i<colaList.length; i++){
            colaList[i].style.boxShadow = "0px 0px 4px rgba(0, 0, 0, 0.5)";
        }
    }
}

function returnMoney(){
    have.innerHTML = parseInt(have.innerHTML)+parseInt(balance.innerHTML);
    balance.innerHTML = "0";
}

function depositMoney(){
    if(parseInt(have.innerHTML) > parseInt(deposit.value)){
        balance.innerHTML = parseInt(balance.innerHTML)+parseInt(deposit.value);
        have.innerHTML = parseInt(have.innerHTML) - parseInt(deposit.value);
        deposit.value = "";
    }
}
