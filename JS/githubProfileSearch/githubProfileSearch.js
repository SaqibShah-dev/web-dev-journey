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
const loadingMsg = document.getElementById("loadingMsg");


searchBtn.addEventListener("click",async()=>{
    const userName = searchInput.value.trim(); 

    if(userName === "") return;
    errorMsg.textContent = "";
    document.getElementById("profile-card").classList.add("hidden"); 
    document.getElementById("repos-container").classList.add("hidden");
    loadingMsg.classList.remove("hidden"); // SHOW loading
    searchBtn.style.pointerEvents = "none";

        
    try {
        console.log("api is calling.............");
        const userData = await searchUser(userName);
        console.log("show user data");
        
        displayUserData(userData);

        const repos = await fetchUserRepos(userName); 
        displayRepos(repos);
        
    } catch (error) {
        errorMsg.textContent = error.message;
        document.getElementById("profile-card").classList.add("hidden"); 
        document.getElementById("repos-container").classList.add("hidden");
    }
    finally{
        loadingMsg.classList.add("hidden");
        searchBtn.style.pointerEvents = "auto";
    }
});

searchInput.addEventListener("keydown",(event)=>{
    if(event.key === "Enter"){
        searchBtn.click();
    }    
});

async function searchUser(userName) {       
        const response = await fetch(`https://api.github.com/users/${userName}`);
        if(!response.ok){
            throw new Error("User not found");
        }
        const userData = await response.json();
        console.log("api is called...........");        
        return userData;
}

async function fetchUserRepos(user_name) {
     const response = await fetch(`https://api.github.com/users/${user_name}/repos`);
     
    if (!response.ok) {
        throw new Error("Could not load repositories");
    }
    const repos = await response.json();
    console.log(" repos json data ",response);
    
    return repos;

}

function displayRepos(userRepos){
    const repoList = document.getElementById("repos-list");
    repoList.innerHTML = "";

    if(userRepos.length === 0){
        repoList.innerHTML = "<li>No public Repository found.</li>";
    }
    
    userRepos.forEach((repo) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <span>⭐ ${repo.stargazers_count}</span>
        `; 
        repoList.appendChild(li);
    });
    document.getElementById("repos-container").classList.remove("hidden");
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