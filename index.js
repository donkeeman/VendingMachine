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

        let colaElem = document.createElement("li");
        let colaElemButton = colaElem.appendChild("button");
        colaElemButton.src = "./public/mediaquery/"


        // 누른 콜라의 인덱스랑 매칭해서 이름과 카운트를 넣어야 함
        // 이름을 검사할지, 혹은 포함여부의 불린 값이 담긴 리스트를 하나 더 만들지
        // 이미 획득 리스트 안에 음료가 있다면, 새로 추가하는 대신 카운트를 증가시켜야 함
        // for(let i = 0; i<buyColaList.childElementCount; i++){
        //     if(buy)
        // }

        let li = buyColaList.lastElementChild;
        buyColaList.appendChild(li.cloneNode(true));
        li.firstElementChild.children[0].src = this.children[0].src;
        li.firstElementChild.children[1].innerHTML = this.children[1].innerHTML;
        // 클릭할 때마다 획득하는 콜라의 개수는 1 증가
        buyColaCount[i]++;
        li.firstElementChild.children[2].innerHTML = buyColaCount[i];
        // setColaCount(buyColaList, buyColaCount, i);

        li.classList.add("selected");
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
        // setColaCount(buyColaList, buyColaCount, i);

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

// 돈 관련 변수에 세 자리마다 ','가 추가된 포맷을 지정해주는 함수
function setMoneyFormat(){
    balance.innerHTML = parseInt(balance.innerHTML.replace(",", "")).toLocaleString("en-US");
    myMoney.innerHTML = parseInt(myMoney.innerHTML.replace(",", "")).toLocaleString("en-US");
    total.innerHTML = parseInt(total.innerHTML.replace(",", "")).toLocaleString("en-US");
}

// 획득 버튼을 누르면 구매 리스트에 있는 콜라가 획득 리스트로 이동하는 함수
function buyCola(){
    // 선택한 콜라의 총 개수 최종 확정
    totalCount = 0;
    // 구매 리스트의 개수의 총합 구하기
    for(let i = 0; i<buyColaCount.length; i++)
        totalCount += buyColaCount[i];

    // 잔액 부족하면
    if(1000*totalCount>parseInt(balance.innerHTML.replace(",", "")))
        alert("잔액이 부족합니다. 입금 후 다시 시도해주세요.");
    // 잔액 안 부족하면
    else{
        // 잔액 = 원래 잔액 - 음료수 구매액
        balance.innerHTML = parseInt(balance.innerHTML.replace(",", "")) - 1000*totalCount;
        // 총금액 = 원래 총금액 + 음료수 구매액
        total.innerHTML = parseInt(total.innerHTML.replace(",", "")) + 1000*totalCount;
        setMoneyFormat();

        for(let i = 0; i<ownColaCount.length; i++){
            // buyColaCount에 저장했던 콜라 구매 개수를 ownColaCount에 누적
            ownColaCount[i] += buyColaCount[i];
            // buyColaCount는 초기화
            buyColaCount[i] = 0;

            // 획득 리스트에 콜라 개수 갱신
            // setColaCount(ownColaList, ownColaCount, i);
            // 구매 리스트에 콜라 개수 갱신 (0이 되었으므로 리스트에서 보이지 않게 함)
            // setColaCount(buyColaList, buyColaCount, i);

            // 콜라 버튼에서 clicked 클래스 제거
            cola[i].classList.remove("clicked");
        }
    }
}

// 반환 버튼을 누르면 잔액을 소지금으로 이동
function returnMoney(){
    // 소지금 = 원래 소지금 + 잔액
    myMoney.innerHTML = parseInt(myMoney.innerHTML.replace(",", ""))+parseInt(balance.innerHTML.replace(",", ""));
    // 잔액은 0으로 초기화
    balance.innerHTML = 0;
    setMoneyFormat();
}

// 입금 버튼을 누르면 입금 input에 입력된 값을 잔액으로 이동
function depositMoney(){
    // 소지금이 입력 input의 value보다 적을 경우
    if(parseInt(myMoney.innerHTML.replace(",", "")) < parseInt(deposit.value))
        alert("소지금이 부족합니다. 다시 입력해 주세요.");
    // 소지금이 입력 input의 value보다 큰 경우
    else{
        // 잔액 = 원래 잔액 + 입력 금액
        balance.innerHTML = parseInt(balance.innerHTML.replace(",", "")) + parseInt(deposit.value);
        // 소지금 = 원래 소지금 - 입력 금액
        myMoney.innerHTML = parseInt(myMoney.innerHTML.replace(",", "")) - parseInt(deposit.value);
        // 입력 input값 초기화
        deposit.value = "";
        setMoneyFormat();
    }
}

// 구매 or 획득 리스트의 값 변경
function setColaCount(list, countArr, index){
    // 해당 리스트 원소의 값이 0이라면, display:none인 클래스로 바꿔서 보이지 않게 한다
    if(countArr[index] == 0){
        list.children[index].lastElementChild.classList.remove("selected");
        cola[index].classList.remove("clicked");
    }
    // 해당 리스트 원소의 값이 0이 아니라면, display를 보이게 하는 클래스를 추가하거나, 원소의 값을 늘린다
    else{
        list.children[index].lastElementChild.lastElementChild.innerHTML = countArr[index];
        list.children[index].lastElementChild.classList.add("selected");
    }
}