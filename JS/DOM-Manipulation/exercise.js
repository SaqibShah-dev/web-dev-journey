const input_text = document.getElementById("input");
const addItemBtn = document.getElementById("addItemBtn");
const removeItemBtn = document.getElementById("removeItemBtn");
const listItem = document.getElementById("itemList");

let selectedItem = null; 

addItemBtn.addEventListener("click", (event) => {
    const input_value = input_text.value;
    if (input_value === "") return;

    const newItem = document.createElement("li");
    newItem.textContent = input_value;

    // newItem.addEventListener("click", () => {
    //     console.log("new item listener:",newItem);
        
    //     if (selectedItem) {
    //         console.log("selected item :",selectedItem);
            
    //         selectedItem.classList.remove("selected");
    //         console.log("selected item class list remove:",selectedItem);
            
    //     }

    //     selectedItem = newItem;
    //     console.log("new item assign to selected item :",selectedItem);

    //     newItem.classList.add("selected");
    //     console.log("new item item class list add:",selectedItem);

    // });

    listItem.appendChild(newItem);
    input_text.value = "";
});

removeItemBtn.addEventListener("click", () => {
    console.log("selected item in remove btn event listener: ",selectedItem);
    
    if (selectedItem) {
        console.log("selected item : ",selectedItem);
        
        selectedItem.remove(); // remove it from the page
        selectedItem = null;   // clear the reference
    }
});



listItem.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("selected");
        console.log("Selected item using toggle");
    }
});