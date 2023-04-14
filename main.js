import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref,push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
 
const appsetting = {
    databaseURL: "https://shopping-list-5826a-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appsetting);
const database = getDatabase(app);

const shoppinglistInDB =  ref(database, "shoppingList");


const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value;
     
    push(shoppinglistInDB, inputValue);
    console.log(inputValue);
    emptyString()
    /*shoppingList.innerHTML += `<li>${inputValue}</li>`*/
})

onValue(shoppinglistInDB, function(snapshot){
    if(snapshot.exists()){
        let shoppingListArray = Object.entries(snapshot.val())
        clearShoppingList()
        for (let i = 0; i < shoppingListArray.length; i++){
            let currentShoppingList = shoppingListArray[i]
            let currentItemID = currentShoppingList[0]
            let currentItemValue =  currentShoppingList[1]
            
            appendItemToShoppingListEL(currentShoppingList)
            
        }
    }else{
        shoppingList.innerHTML = "No items Here....."
    }

}) 
function clearShoppingList(){
    shoppingList.innerHTML = ""
}
function emptyString(){
    inputFieldEl.value = ""
}
function appendItemToShoppingListEL(item){

    let itemID = item[0]
    let itemValue = item[1]

    let newEL = document.createElement("li")

    newEL.textContent = itemValue

    newEL.addEventListener("click", function(){
       let exactLocationOfitemInDB = ref(database,`shoppingList/${itemID}`)
       remove(exactLocationOfitemInDB)
    })   

    shoppingList.append(newEL)


}