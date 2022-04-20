let buyDrinkList = document.getElementById("buyDrinkList");
let ownDrinkList = document.getElementById("ownDrinkList");

let cola = document.querySelectorAll(".cola");

let balance = document.getElementById("balance");
let deposit = document.getElementById("deposit");
let have = document.getElementById("have");
let total = document.getElementById("total");

const returnButton = document.getElementById("returnButton");
const depositButton = document.getElementById("depositButton");
const buyButton = document.getElementById("buyButton");


// origin, violet, yellow, cool, green, orange 순서
// 콜라의 재고 (아직은 정확한 수치를 모름)
let colaCount = [4, 4, 4, 4, 4, 4];
// 자판기에서 획득한 콜라의 개수
let buyColaCount = [0, 0, 0, 0, 0, 0];
// 구매 후 획득한 음료 리스트에 들어가는 콜라의 개수
let ownColaCount = [0, 0, 0, 0, 0, 0];

let totalCount = 0;

// 콜라 클릭 시 구매 리스트에 추가
for(let i = 0; i<cola.length; i++){
    cola[i].onclick = function(){
        cola[i].classList.add("clicked");
        // if 콜라 재고가 0개가 아닐 때
        // 클릭할 때마다 획득하는 콜라의 개수는 1 증가
        buyColaCount[i]++;
        setColaCount(buyDrinkList, buyColaCount, i);
        
        // 재고는 1 감소
        colaCount[i]--;
        if(colaCount[i] == 0)
            this.classList.add("soldout");
        // else
        // 콜라 품절
        // cola[i].classList.add("soldout");
    }
}

// 구매 리스트의 콜라 버튼 클릭 시 콜라 개수가 한 개씩 줄어들어야 함


returnButton.onclick = returnMoney;
depositButton.onclick = depositMoney;
buyButton.onclick = buyDrink;

function buyDrink(){
    // 선택한 음료수의 총 개수 구하기
    totalCount = 0;
    for(let i = 0; i<buyColaCount.length; i++)
        totalCount += buyColaCount[i];

    // 잔액 부족하면
    if(1000*totalCount>parseInt(balance.innerHTML))
        alert("잔액이 부족합니다. 입금 후 다시 시도해주세요.");
    // 잔액 안 부족하면
    else{
        balance.innerHTML = parseInt(balance.innerHTML) - 1000*totalCount;
        total.innerHTML = parseInt(total.innerHTML)+1000*totalCount;
        for(let i = 0; i<cola.length; i++)
            cola[i].classList.remove("clicked");

        for(let i = 0; i<ownColaCount.length; i++){
            ownColaCount[i] += buyColaCount[i];
            buyColaCount[i] = 0;
            setColaCount(ownDrinkList, ownColaCount, i);
            setColaCount(buyDrinkList, buyColaCount, i);
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
    else
        alert("소지금이 부족합니다. 다시 입력해 주세요.");
}

function setColaCount(list, countArr, index){
    if(countArr[index] == 0)
        list.children[index].lastElementChild.classList.remove("selected");
    else{
        list.children[index].lastElementChild.lastElementChild.innerHTML = countArr[index];
        list.children[index].lastElementChild.classList.add("selected");
    }
}