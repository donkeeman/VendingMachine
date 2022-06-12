// DOM
let colaList = document.querySelector("#colaList"); // 좌측 상단의 콜라 목록 (ul)
let buyColaList = document.querySelector("#buyColaList"); // 좌측 하단의 구매한 콜라 목록 (ul)
let ownColaList = document.querySelector("#ownColaList"); // 우측의 획득한 콜라 목록 (ul)

let balance = document.querySelector("#balance"); // 잔액
let deposit = document.querySelector("#deposit"); // 입금액
let myMoney = document.querySelector("#myMoney"); // 소지금
let total = document.querySelector("#total"); // 총금액

const returnButton = document.querySelector("#returnButton"); // 거스름돈 반환 버튼
const depositButton = document.querySelector("#depositButton"); // 입금 버튼
const buyButton = document.querySelector("#buyButton"); // 획득 버튼

// 콜라 클래스
class Cola{
    constructor(obj){
        this.id = obj.id; // id
        this.src = obj.src; // 이미지 경로
        this.name = obj.name; // 이름
        this.stock = obj.stock; // 재고 수량
        this.buy = obj.buy; // 구매 수량
        this.own = obj.own; // 획득 수량
        this.price = obj.price; // 가격
    }
    // getter
    getStock(){
        return this.stock;
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
    // setter
    setOwn(){
        this.own += this.buy;
    }
    // 콜라 구매 시 구매 수량은 1 증가, 재고 수량은 1 감소
    buyCola(){
        this.buy++;
        this.stock--;
    }
    // 콜라 환불 시 구매 수량은 1 감소, 재고 수량은 1 증가
    refundCola(){
        this.buy--;
        this.stock++;
    }
    // 콜라 구매 개수 0으로 초기화
    clearBuy(){
        this.buy = 0;
    }
}

// 콜라 클래스 저장하는 배열
let colaClassArr = [];
// 콜라 버튼을 눌렀을 때 콜라를 추가할 리스트(집합)
let buyList = new Set();
// 획득 버튼을 눌렀을 때 최종 구매한 콜라의 리스트(집합)
let ownList = new Set();

// 페이지가 로드되었을 때 바로 실행할 함수
// 금액 초기화 및 포맷 설정
setMoneyFormat();
// 자판기 영역에 콜라 표시
getColaInfo();

returnButton.addEventListener("click", returnMoney); // 거스름돈 반환 버튼 이벤트
depositButton.addEventListener("click", depositMoney); // 입금 버튼 이벤트
buyButton.addEventListener("click", buyCola); // 획득 버튼 이벤트
myMoney.addEventListener("click", depositMyMoney); // 소지금 이벤트

// 콜라 json 데이터를 fetch로 받아온 후, table에 그려주는 함수
async function getColaInfo() {
    const response = await fetch("https://raw.githubusercontent.com/donkeeman/VendingMachine/main/data.json");
    const data = await (response.json());
    // 배열에 콜라 클래스 생성해서 넣기
    for(let c of data){
        colaClassArr.push(new Cola(c));
    }
    // 배열 안에 있는 콜라 클래스대로 li 그리기
    for(let cola of colaClassArr){
        colaList.appendChild(createCola(cola));
    }

    let cola = document.querySelectorAll(".cola");
    for(let i in colaClassArr){
        // 콜라 버튼 클릭 시 콜라 구매
        cola[i].addEventListener("click", (e) => {
            colaClassArr[i].buyCola();
            // buyList는 set이므로 중복체크 필요 없이 그냥 add
            // 나중에 콜라 클래스의 id로 찾을 수 있도록 인덱스를 넣음
            buyList.add(i);
            updateList("buy");
            colaClassCheck();
        });
    }
}

// .cola(좌측 상단의 콜라 li들)를 반환하는 함수
function createCola(colaObj) {
    let li = document.createElement("li");
    let colaButton = document.createElement("button");
    colaButton.classList.add("cola");
    let colaImg = document.createElement("img");
    colaImg.classList.add("colaImage");
    colaImg.src = colaObj.src;
    let colaName = document.createElement("strong");
    colaName.classList.add("colaName");
    colaName.innerText = colaObj.name;
    let colaPrice = document.createElement("span");
    colaPrice.classList.add("colaPrice");
    colaPrice.innerText = `${colaObj.price}원`;
    colaButton.append(colaImg, colaName, colaPrice);
    li.appendChild(colaButton);
    return li;
}

// buyColaList, ownColaList의 li를 그려주는 함수
function createLi(colaObj, state) {
    let li = document.createElement("li");
    let button = document.createElement("button");
    let colaImg = document.createElement("img");
    colaImg.classList.add("liColaImage");
    colaImg.src = colaObj.src;
    let colaName = document.createElement("strong");
    colaName.classList.add("liColaName");
    colaName.innerText = colaObj.name;
    let colaCount = document.createElement("span");
    colaCount.classList.add("liColaCount");
    // state가 buy이면 colaCount에 구매 수량을 표시
    if(state === "buy"){
        colaCount.innerText = colaObj.getBuy();
    }
    // state가 own이면 colaCount에 획득 수량을 표시
    else if(state === "own"){
        colaCount.innerText = colaObj.getOwn();
    }
    button.append(colaImg, colaName, colaCount);
    li.appendChild(button);
    // 콜라 li를 클릭하면 콜라 환불
    // 이벤트 타겟의 태그 이름이 버튼이거나, 타겟의 부모 노드의 태그 이름이 버튼일 때 이벤트 실행
    // (하위의 img, strong, span을 눌렀을 때도 실행되게 하기 위해)
    li.addEventListener("click", (e) => {
        if(e.target.tagName === "BUTTON" || e.target.parentNode.tagName === "BUTTON") {
            colaObj.refundCola();
            // 1개일 때 버튼을 눌러서 구매 개수가 0이 되면 리스트에서 제거
            if(colaObj.getBuy() <= 0){
                buyList.delete(colaObj.id.toString());
            }
        }
        updateList("buy");
        colaClassCheck();
    });
    return li;
}

// state에 따라 콜라 리스트 업데이트(li를 그림) 하는 함수
function updateList(state){
    // state가 buy이면 좌측 하단의 buyColaList를 업데이트
    if(state === "buy"){
        buyColaList.innerHTML = "";
        for(let c of buyList){
            buyColaList.appendChild(createLi(colaClassArr[c], "buy"));
        }
    }
    // state가 own이면 우측의 ownColaList를 업데이트
    else if(state === "own"){
        ownColaList.innerHTML = "";
        for(let c of ownList){
            ownColaList.appendChild(createLi(colaClassArr[c], "own"));
        }
    }
}

// .cola 들의 클래스 관리하는 함수
function colaClassCheck(){
    let cola = document.querySelectorAll(".cola");
    for(let i in colaClassArr){
        // 클릭 시 구매 개수가 1 이상이면 clicked 클래스 추가
        if(colaClassArr[i].getBuy() !== 0){
            cola[i].classList.add("clicked");
        }
        else{
            cola[i].classList.remove("clicked");
        }
        // 클릭 시 재고가 0이면 soldout 클래스 추가
        if(colaClassArr[i].getStock() === 0){
            cola[i].classList.add("soldout");
        }
        else{
            cola[i].classList.remove("soldout");
        }
    }
}

// 돈 관련 변수에 세 자리마다 ','가 추가된 포맷을 지정해주는 함수
// 돈이 변경될 때마다 붙어 있던 ,를 없애고 숫자로 바꾼 후 다시 ,를 추가하는 형식
function setMoneyFormat(){
    balance.innerHTML = parseInt(balance.innerHTML.replace(",", "")).toLocaleString("en-US");
    myMoney.innerHTML = parseInt(myMoney.innerHTML.replace(",", "")).toLocaleString("en-US");
    total.innerHTML = parseInt(total.innerHTML.replace(",", "")).toLocaleString("en-US");
}

// 획득 버튼을 누르면 구매 리스트에 있는 콜라가 획득 리스트로 이동하는 함수
function buyCola(){
    // 선택한 콜라의 총 개수 최종 확정
    let totalCount = colaClassArr.map(cola => cola.getBuy()).reduce((total, num) => total+num, 0);
    console.log(`total: ${totalCount}`);
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
        // buyList의 원소들을 ownList로 옮겨옴
        for(let cola of buyList){
            ownList.add(cola);
        }
        // 콜라의 buy를 own으로 옮기고, buy는 0으로 초기화
        for(let i in colaClassArr){
            colaClassArr[i].setOwn();
            colaClassArr[i].clearBuy();
        }
        updateList("own");
        // buyList 초기화
        buyList.clear();
        // buyColaList를 비워주기 위해 buyColaList도 업데이트
        updateList("buy");
        colaClassCheck();
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
    // 입금액 입력 란이 비어있는 경우, 0원으로 처리
    if(deposit.value === ""){
        deposit.value = 0;
    }
    // 입금액 입력값이 음수일 경우
    if(deposit.value < 0){
        alert("입금액은 0원 이상이어야 합니다. 다시 입력해 주세요.");
        deposit.value = "";
        return;
    }
    // 소지금이 입력 input의 value보다 적을 경우
    if(parseInt(myMoney.innerHTML.replace(",", "")) < parseInt(deposit.value))
        alert("소지금이 부족합니다. 다시 입력해 주세요.");
    // 소지금이 입력 input의 value보다 큰 경우
    else{
        // 잔액 = 원래 잔액 + 입력 금액
        balance.innerHTML = parseInt(balance.innerHTML.replace(",", "")) + parseInt(deposit.value);
        // 소지금 = 원래 소지금 - 입력 금액
        myMoney.innerHTML = parseInt(myMoney.innerHTML.replace(",", "")) - parseInt(deposit.value);
        // 입금액 입력 input값 초기화
        deposit.value = "";
        setMoneyFormat();
    }
}

// 소지금 부분을 클릭하면 소지금에 값을 추가 또는 차감
function depositMyMoney(){
    const money = prompt("추가/차감할 금액을 입력해주세요. (음수로 입력하면 차감됩니다.)");
    // 취소 눌렀거나, 입력값이 비어 있거나, 숫자가 아니면 무시
    if(money === null || money === "" || isNaN(money)){
        return;
    }
    // 소지금에 입력한 만큼의 금액을 추가 또는 차감
    myMoney.innerHTML = parseInt(myMoney.innerHTML.replace(",", "")) + parseInt(money);
    setMoneyFormat();
}