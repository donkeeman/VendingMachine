let colaList = document.getElementById("colaList");
let buyColaList = document.getElementById("buyColaList");
let ownColaList = document.getElementById("ownColaList");

let balance = document.getElementById("balance");
let deposit = document.getElementById("deposit");
let myMoney = document.getElementById("myMoney");
let total = document.getElementById("total");

const returnButton = document.getElementById("returnButton");
const depositButton = document.getElementById("depositButton");
const buyButton = document.getElementById("buyButton");

// 콜라 클래스
class Cola{
    constructor(name){
        this.src = `./public/mediaquery/${name}.png`
        this.name = name;
        this.stock = 4;
        this.buy = 0;
        this.own = 0;
        this.price = 1000;
    }
    getBuy(){
        return this.buy;
    }
    getOwn(){
        return this.own;
    }
    getPrice(){
        return this.price;
    }
    buyCola(){
        this.buy++;
        this.stock--;
    }
    refundCola(){
        this.buy--;
        this.stock++;
    }
    clearBuy(){
        this.buy = 0;
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
    new Cola("Orange_Cola"),
];

let buyList = new Set();
let ownList = new Set();

let cola;
// 금액 초기화
setMoneyFormat();
// 자판기 영역에 콜라 표시
for(let cola of colaInfo){
    colaList.appendChild(createCola(cola));
}

// 콜라 버튼 클릭 시 구매 리스트에 추가
for(let i in colaInfo){
    cola = document.querySelectorAll(".cola");
    cola[i].addEventListener("click", () => {
        colaInfo[i].buyCola();
        drawOutline(true, cola[i]);
        // 재고가 0이면 품절 상태를 표시하는 soldout 클래스를 버튼에 추가
        if(colaInfo[i].stock === 0){
            cola[i].classList.add("soldout");
        }
        else{
            cola[i].classList.remove("soldout");
        }
        if(buyList.has(colaInfo[i].name)){
            let index = [...buyList].indexOf(colaInfo[i].name);
            buyColaList.children[index].innerHTML = createLi(colaInfo[i], "buy").innerHTML;
        }
        else{
            buyColaList.appendChild(createLi(colaInfo[i], "buy"));
            buyList.add(colaInfo[i].name);
        }
        console.log(buyList);
    });
}

// 구매 리스트의 콜라 버튼 클릭 시 구매 리스트에서 1개씩 제거

returnButton.addEventListener("click", returnMoney);
depositButton.addEventListener("click", depositMoney);
buyButton.addEventListener("click", buyCola);

function createCola(obj) {
    let li = document.createElement("li");
    let colaButton = document.createElement("button");
    colaButton.classList.add("cola");
    let colaImg = document.createElement("img");
    colaImg.classList.add("colaImage");
    colaImg.src = obj.src;
    let colaName = document.createElement("strong");
    colaName.classList.add("colaName");
    colaName.innerText = obj.name;
    let colaPrice = document.createElement("span");
    colaPrice.classList.add("colaPrice");
    colaPrice.innerText = `${obj.price}원`;
    colaButton.append(colaImg, colaName, colaPrice);
    li.appendChild(colaButton);
    return li;
}

function createLi(obj, state) {
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
    if(state === "buy"){
        colaCount.innerText = obj.buy;
    }
    else if(state === "own"){
        colaCount.innerText = obj.own;
    }
    button.append(colaImg, colaName, colaCount);

    li.appendChild(button);
    li.addEventListener("click", (e) => {
        if(e.target.tagName === "BUTTON" || e.target.parentNode.tagName === "BUTTON") {
            obj.refundCola();
            li.innerHTML = createLi(obj, state).innerHTML;
            if(obj.getBuy() === 0){
                li.innerHTML = "";
                buyList.delete(obj.name);
            }
        }
        console.log(buyList);
    });
    return li;
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
    let totalCount = colaInfo.map(cola => cola.getBuy()).reduce((total, num) => total+num, 0);

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
        for(let cola of buyList){
            if(!ownList.has(cola)){
                ownList.add(cola);
            }
        }
        for(let i in colaInfo){
                colaInfo[i].setOwn(colaInfo[i].getBuy());
        }
        ownColaList.innerHTML = "";
        for(let cola of ownList){
            let colaObj = colaInfo.filter(obj => obj.name === cola)[0];
            console.log(colaObj);
            ownColaList.appendChild(createLi(colaObj, "own"));
            console.log(createLi(colaObj, "own"));
            colaObj.clearBuy();
        }
        buyList.clear();
        buyColaList.innerHTML = "";
        document.querySelectorAll(".cola").forEach(cola => {
            cola.classList.remove("clicked");
        })
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

// 클릭 시 클릭된 상태를 표시하는 clicked 클래스를 버튼에 추가
function drawOutline(state, obj){
    if(state){
        obj.classList.add("clicked");
    }
    else{
        obj.classList.remove("clicked");
    }
}