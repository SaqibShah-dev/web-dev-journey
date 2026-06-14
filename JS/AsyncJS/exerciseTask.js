const loadBtn = document.getElementById("loadBtn");
const listItem = document.getElementById("userList");
const errorMsg = document.getElementById("errorMsg");


loadBtn.addEventListener("click",async()=>{
    listItem.textContent = "";
    loadBtn.disabled = true;
    errorMsg.textContent = "";
    loadBtn.textContent = "Loading...";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if(!response.ok){
            throw new Error("Failed to load users");
        }
        const users = await response.json();
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.name+"---"+user.email;
            listItem.appendChild(li);
        });

    } catch (error) {
        errorMsg.textContent = "error"+error.message;
    } finally{
        loadBtn.textContent = "Load users";
        loadBtn.disabled = false;
    }
});