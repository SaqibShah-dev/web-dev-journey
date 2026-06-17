const searchBtn = document.querySelector(".search-icon");
const searchInput = document.getElementById("search");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click",async()=>{
    const userName = searchInput.value.trim();    
    if(userName === "") return;
    errorMsg.textContent = "";
    
    try {
        const userData = await searchUser(userName);
        console.log("user found: ",userData);
        

    } catch (error) {
        errorMsg.textContent = error.message;
    }
});

searchInput.addEventListener("keydown",(event)=>{
    if(event.key === "Enter"){
        searchBtn.click();
    }    
});

async function searchUser(userName) {
    try {        
        const response = await fetch(`https://api.github.com/users/${userName}`);

        if(!response.ok){
            throw new Error("User not found");
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.log("error",error.message);        
    }
}