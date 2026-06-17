const searchBtn = document.querySelector(".search-icon");
const searchInput = document.getElementById("search");
const errorMsg = document.getElementById("errorMsg");
const profileImg = document.getElementById("user-img");
const name = document.getElementById("name");
const userName = document.getElementById("userName");
const user_des = document.getElementById("user-des");
const userLocation = document.getElementById("user-loc");
const totFollowers = document.getElementById("total-followers");
const totFollowing = document.getElementById("total-following");
const totRepos = document.getElementById("total-repos");
const profileLink = document.getElementById("profileLink");


searchBtn.addEventListener("click",async()=>{
    const userName = searchInput.value.trim();    
    if(userName === "") return;
    errorMsg.textContent = "";
    
    try {
        console.log("api is calling.............");
        const userData = await searchUser(userName);
        console.log("show user data");
        
        displayUserData(userData);
        
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
        console.log("api is called...........");
        
        return userData;
    } catch (error) {
        console.log("error",error.message);        
    }
}

function displayUserData(userdata){
    profileImg.src = userdata.avatar_url;
    name.textContent = userdata.name || userdata.login;
    userName.textContent = "@"+userdata.login;
    user_des.textContent = userdata.bio || "No bio available";
    userLocation.textContent = userdata.location || "Location not specified";
    totFollowers.textContent = userdata.followers;
    totFollowing.textContent = userdata.following;
    totRepos.textContent = userdata.public_repos;
    profileLink.href = userdata.html_url;

    document.getElementById("profile-card").classList.remove("hidden");
};