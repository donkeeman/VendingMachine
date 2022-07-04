# Cola Cola Vending Machine
> [Cola Cola Vending Machine](https://donkeeman.github.io/VendingMachine)은 자판기의 동작을 시각화한 웹 사이트입니다.  

<img src="./preview/web_main_preview.png" alt="web_main_preview" width="500" height="400"/> <img src="./preview/mobile_main_preview.png" alt="mobile_main_preview" width="150" height="400"/>

실제 자판기처럼 음료를 한 개씩 선택/선택 취소할 수 있고, 돈을 입금하면 선택한 음료를 획득할 수 있습니다.  
소지금을 추가할 수도 있고, 거스름돈 반환도 가능합니다.

## 지원되는 브라우저
>**경고:** Internet Explorer에서는 제대로 동작하지 않습니다.  

Chrome, Edge, Safari, Firefox,  등 최신 버전의 타 브라우저 사용을 권장합니다.

## 개발 스택
- HTML
- CSS
- JavaScript (Vanilla)

## 기능 목록
### 콜라 선택

<img src="./preview/add_cola.gif" alt="add_cola" width="500" height="350"/>

좌측 상단의 콜라 버튼을 누르면 좌측 하단의 리스트에 1개씩 추가됩니다.

### 콜라 선택 취소

<img src="./preview/delete_cola.gif" alt="delete_cola" width="500" height="350"/>

좌측 하단의 리스트에서 콜라를 누르면 1개씩 차감되고, 0개가 되면 리스트에서 제거됩니다.

### 입금

<img src="./preview/deposit.gif" alt="deposit" width="500" height="350"/> <img src="./preview/deposit_alert.png" alt="deposit_alert" width="300" height="100"/>

입금액 입력 란에 원하는 만큼의 금액을 입력하면 잔액에 추가되고 소지금이 차감됩니다.  
입력한 금액이 소지금보다 많은 경우에는 alert 창이 출력됩니다.

### 콜라 구매

<img src="./preview/buy.gif" alt="buy" width="500" height="350"/> <img src="./preview/buy_alert.png" alt="buy_alert" width="300" height="100"/>

획득 버튼을 누르면 좌측 하단의 리스트에 있는 콜라들이 획득한 음료 리스트로 옮겨집니다.  
콜라의 가격만큼의 금액이 잔액에서 차감되고, 우측 하단의 총금액이 증가합니다.

잔액이 콜라의 가격보다 적은 경우에는 alert 창이 출력됩니다.

### 거스름돈 반환

<img src="./preview/change.gif" alt="change" width="500" height="350"/>

거스름돈 반환 버튼을 누르면 잔액 란의 금액을 소지금에 추가합니다.

### 콜라 품절

<img src="./preview/soldout.gif" alt="soldout" width="500" height="350"/>

콜라의 재고 수량이 없다면 품절이라고 표시되고 더 이상 리스트에 추가할 수 없습니다.

### 소지금 입금

<img src="./preview/deposit_mymoney.gif" alt="deposit+mymoney" width="500" height="350"/> <img src="./preview/deposit_mymoney_alert.png" alt="deposit_mymoney_alert" width="300" height="150"/>

소지금 영역을 클릭하면 prompt 창이 출력됩니다.  
입력한 금액만큼 소지금이 추가 또는 차감됩니다.

## 어려웠던 부분
- fetch를 이용하여 비동기적으로 데이터를 받아오는 부분
  - async함수에 대한 이해가 부족해서 처음에는 async 함수가 데이터만 리턴하고 외부에서 나머지 처리를 하려고 시도했으나 프로미스만 리턴되어서 난항을 겪음
  - 프로미스에 대해 공부를 더 한 후, async 함수 안에서 데이터를 사용하는 작업을 모두 처리해 주는 것으로 해결
- 동적으로 생성된 요소에 이벤트를 추가하는 부분
  - 동적으로 생성되는 요소는 querySelector 등으로 불러올 수가 없어서 고민
  - 요소를 만드는 함수 안에서 parent에 append하기 전에 이벤트 핸들러를 연결해주고 append하는 것으로 해결
## 개선 사항
- index.js 파일을 TypeScript를 이용하여 수정하기
- fetch 부분에서 발생할 수 있는 에러를 try-catch 블록을 이용하여 예외 처리하기

## 버그 제보 및 피드백
버그 제보 및 피드백은 언제나 환영합니다.  
PR을 하지 않더라도 [이슈](https://github.com/donkeeman/VendingMachine/issues)를 통해 편하게 제보해 주시면 시간이 되는 대로 수정하겠습니다.
