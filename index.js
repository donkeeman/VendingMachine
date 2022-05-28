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
document.body.addEventListener("load", setMoneyFormat());

class Cola{
    constructor(name){
        this.src = `./public/mediaquery/${name}.png`
        this.name = name;
        this.stock = 4;
        this.buy = 0;
        this.own = 0;
    }
    getBuy(){
        return this.buy;
    }
    getOwn(){
        return this.own;
    }
    buyCola(){
        this.buy++;
        this.stock--;
    }
    refundCola(){
        this.buy--;
        this.stock++;
    }
    setOwn(n){
        this.own += n;
    }
}

// 콜라 정보 (이미지 경로, 이름, 재고, 구매 개수, 획득 개수 순)
let colaInfo = [
    new Cola("Original_Cola"),
    new Cola("Violet_Cola"),
    new Cola("Yellow_Cola"),
    new Cola("Cool_Cola"),
    new Cola("Green_Cola"),
    new Cola("Orange_Cola")
];

let totalCount = 0;

const createLi = (obj) => {
    let li = document.createElement("li");
    let button = document.createElement("button");
    let colaImg = document.createElement("img");
    colaImg.classList.add("buyColaImage");
    colaImg.src = obj.src;
    let colaName = document.createElement("strong");
    colaName.classList.add("buyColaName");
    colaName.innerText = obj.name;
    let colaCount = document.createElement("span");
    colaCount.classList.add("buyColaCount");
    colaCount.innerText = obj.buy;

    button.append(colaImg, colaName, colaCount);
    li.appendChild(button);
    return li;
}

// 콜라 버튼 클릭 시 구매 리스트에 추가
for(let i = 0; i<cola.length; i++){
    cola[i].addEventListener("click", () => {
        // 클릭 시 클릭된 상태를 표시하는 clicked 클래스를 버튼에 추가
        cola[i].classList.add("clicked");

        colaInfo[i].buyCola();
        // 재고가 0이면 품절 상태를 표시하는 soldout 클래스를 버튼에 추가
        if(colaInfo[i].stock === 0)
            this.classList.add("soldout");

        // 콜라 정보를 업데이트하는 함수 필요
    });
}

// 구매 리스트의 콜라 버튼 클릭 시 리스트에서 콜라 환불
for(let i = 0; i<buyColaList.childElementCount; i++){
    buyColaList.children[i].lastElementChild.addEventListener("click", () => {
        colaInfo[i].refundCola();
        if(colaInfo[i].stock !== 0){
            this.classList.remove("soldout");
        }
    })
}

returnButton.onclick = returnMoney;
depositButton.onclick = depositMoney;
buyButton.onclick = buyCola;

const isExist = (name) => {
    for(let i = 0; i<buyColaList.childElementCount; i++){
        if(buyColaList.children[i].firstElementChild.firstElementChild.nextSibling.innerText === name)
        return i;
    }
    return -1;
}

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