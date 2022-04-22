let buyColaList = document.getElementById("buyColaList");
let ownColaList = document.getElementById("ownColaList");

let cola = document.querySelectorAll(".cola");

let balance = document.getElementById("balance");
let deposit = document.getElementById("deposit");
let myMoney = document.getElementById("myMoney");
let total = document.getElementById("total");

const returnButton = document.getElementById("returnButton");
const depositButton = document.getElementById("depositButton");
const buyButton = document.getElementById("buyButton");

// 금액 초기화
document.body.onload = setMoneyFormat;

// origin, violet, yellow, cool, green, orange 순서
// 콜라의 재고 (아직은 정확한 수치를 모름)
let colaCount = [4, 4, 4, 4, 4, 4];
// 자판기에서 획득한 콜라의 개수
let buyColaCount = [0, 0, 0, 0, 0, 0];
// 구매 후 획득한 음료 리스트에 들어가는 콜라의 개수
let ownColaCount = [0, 0, 0, 0, 0, 0];

let totalCount = 0;

// 콜라 버튼 클릭 시 구매 리스트에 추가
for(let i = 0; i<cola.length; i++){
    cola[i].onclick = function(){
        // 클릭 시 클릭된 상태를 표시하는 clicked 클래스를 버튼에 추가
        cola[i].classList.add("clicked");

        // 클릭할 때마다 획득하는 콜라의 개수는 1 증가
        buyColaCount[i]++;
        setColaCount(buyColaList, buyColaCount, i);

        // 콜라의 재고는 1 감소
        colaCount[i]--;

        // 재고가 0이면 품절 상태를 표시하는 soldout 클래스를 버튼에 추가
        if(colaCount[i] == 0)
            this.classList.add("soldout");
    }
}

// 구매 리스트의 콜라 버튼 클릭 시 리스트에서 콜라 환불
for(let i = 0; i<buyColaList.childElementCount; i++){
    buyColaList.children[i].lastElementChild.onclick = function(){
        // 클릭할 때마다 획득한 콜라의 수에서 1 감소
        buyColaCount[i]--;
        setColaCount(buyColaList, buyColaCount, i);

        // 콜라 재고는 1 증가
        colaCount[i]++;

        // 콜라의 재고가 0이었다가 다시 1개 이상 생긴 경우 soldout 클래스를 제거하고 원래대로 되돌림
        if(colaCount[i] != 0)
            cola[i].classList.remove("soldout");
    }
}

returnButton.onclick = returnMoney;
depositButton.onclick = depositMoney;
buyButton.onclick = buyCola;


function setMoneyFormat(){
    balance.innerHTML = parseInt(balance.innerHTML.replace(",", "")).toLocaleString("en-US");
    myMoney.innerHTML = parseInt(myMoney.innerHTML.replace(",", "")).toLocaleString("en-US");
    total.innerHTML = parseInt(total.innerHTML.replace(",", "")).toLocaleString("en-US");
}

function buyCola(){
    // 선택한 콜라의 총 개수 최종 확정
    totalCount = 0;
    for(let i = 0; i<buyColaCount.length; i++)
        totalCount += buyColaCount[i];

    // 잔액 부족하면
    if(1000*totalCount>parseInt(balance.innerHTML.replace(",", "")))
        alert("잔액이 부족합니다. 입금 후 다시 시도해주세요.");
    // 잔액 안 부족하면
    else{
        // 잔액 = 잔액 - 음료수 구매액
        balance.innerHTML = parseInt(balance.innerHTML.replace(",", "")) - 1000*totalCount;
        // 총금액 = 총금액 + 음료수 구매액
        total.innerHTML = parseInt(total.innerHTML.replace(",", "")) + 1000*totalCount;
        setMoneyFormat();

        for(let i = 0; i<ownColaCount.length; i++){
            // buyColaCount에 저장했던 콜라 구매 개수를 ownColaCount에 누적
            ownColaCount[i] += buyColaCount[i];
            // buyColaCount는 초기화
            buyColaCount[i] = 0;

            setColaCount(ownColaList, ownColaCount, i);
            setColaCount(buyColaList, buyColaCount, i);

            // 콜라 버튼에서 clicked 클래스 제거
            cola[i].classList.remove("clicked");
        }
    }
}

function returnMoney(){
    myMoney.innerHTML = parseInt(myMoney.innerHTML.replace(",", ""))+parseInt(balance.innerHTML.replace(",", ""));
    balance.innerHTML = 0;
    setMoneyFormat();
}

function depositMoney(){
    if(parseInt(myMoney.innerHTML.replace(",", "")) >= parseInt(deposit.value)){
        balance.innerHTML = parseInt(balance.innerHTML.replace(",", "")) + parseInt(deposit.value);
        myMoney.innerHTML = parseInt(myMoney.innerHTML.replace(",", "")) - parseInt(deposit.value);
        deposit.value = "";
        setMoneyFormat();
    }
    else
        alert("소지금이 부족합니다. 다시 입력해 주세요.");
}

function setColaCount(list, countArr, index){
    if(countArr[index] == 0){
        list.children[index].lastElementChild.classList.remove("selected");
        cola[index].classList.remove("clicked");
    }
    else{
        list.children[index].lastElementChild.lastElementChild.innerHTML = countArr[index];
        list.children[index].lastElementChild.classList.add("selected");
    }
}