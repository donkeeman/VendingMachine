let buyDrinkList = document.getElementById("buyDrinkList");
let ownDrinkList = document.getElementById("ownDrinkList");

let buyButton = document.getElementById("buyButton");

buyButton.onclick = buyDrink;

function buyDrink(){
    for(let i = 0; i<buyDrinkList.childElementCount; i++){
        let drink = buyDrinkList.children[i].cloneNode(true);
        ownDrinkList.appendChild(drink);
    }
}

// function total(){
//     for(let i = 0; i<ownDrinkList.childElementCount; i++){
//         ownDrinkList.children[i].
//     }
// }