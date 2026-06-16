const inputTxt = document.getElementById("note");
const addBtn = document.getElementById("add-btn");
const listItem = document.getElementById("list");
const removeBtn = document.getElementById("remove-btn");
const updateBtn = document.getElementById("update-btn");

let selectedItem = null;

addBtn.addEventListener("click",()=>{
    const inputValue = inputTxt.value;

    if(inputValue === "") return;

    if(inputValue){
        const li = document.createElement("li");
        li.textContent = inputValue;

        listItem.appendChild(li);
        inputTxt.value = "";
    }
});


updateBtn.addEventListener("click",()=>{
    if(selectedItem){
        const inputVal = inputTxt.value;
        if(inputVal === "") return;
        selectedItem.textContent = inputVal;
        selectedItem.classList.remove("selected");
        selectedItem = null;
        inputTxt.value = "";
        console.log("update selected item: ",selectedItem);

    }
});

removeBtn.addEventListener("click",()=>{
    if(selectedItem){
        // 1. Tell the selected <li> to remove itself from the page
        selectedItem.remove();       
        // 2. Clear the variable so JavaScript knows nothing is selected anymore
        selectedItem = null;
        console.log("Item removed successfully.");
        
    }
});




listItem.addEventListener("click",(event)=>{
    if(event.target.tagName === "LI"){
        if(selectedItem){
            selectedItem.classList.remove("selected");  
            console.log("remove selected:",selectedItem);
              
        }
        if(selectedItem === event.target){
            console.log("selected is null",selectedItem);        
            selectedItem = null;
        }
        else{            
            selectedItem = event.target;
            selectedItem.classList.add("selected");
            console.log("selected item is add",selectedItem);          
        }
    }
});
