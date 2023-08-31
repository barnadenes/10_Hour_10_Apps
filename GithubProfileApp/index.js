const APIURL = "https://api.github.com/users/";
const mainEL = document.querySelector(".main");
const formEl = document.querySelector("#form");
const inputEl = document.querySelector("#search");

getUser("florinpop17");

async function getUser(name) {
  const resp = await fetch(APIURL + name);
  const respData = await resp.json();

  createUserCard(respData);
  fetchRepos(name);
}

async function fetchRepos(name) {
  const resp = await fetch(APIURL + name + "/repos");
  const response = await resp.json();

  addReposeToCard(response);
}

function createUserCard(user) {
  const card = `
        <div class="img-container">
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/>
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul class="info">              
                <li><i class="fa-solid fa-star"></i> ${user.followers}</li>                
                <li><i class="fa-solid fa-heart"></i> ${user.following}</li>
                <li><i class="fa-solid fa-book"></i> ${user.public_repos}</li>
            </ul>
            <h4>Repositories: </h4>
            <div class="repos"></div>
        </div>
    `;

  mainEL.innerHTML = card;
}

function addReposeToCard(repos) {
  const reposEL = document.querySelector(".repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 12)
    .forEach((repo) => {
      const aEl = document.createElement("a");
      aEl.classList.add("repo");
      aEl.href = repo.html_url;
      aEl.target = "_blank";

      aEl.innerText = repo.name;
      reposEL.appendChild(aEl);
    });
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputEl.value;

  if (name) {
    getUser(name);
  }

  inputEl.value = "";
});
