const APIURL = 'https://api.github.com/users/';
const mainEL = document.querySelector('.main');
const formEl = document.querySelector('#form');
const inputEl = document.querySelector('#search');


async function getUser(name) {
    const resp = await fetch(APIURL + name);
    const respData  = await resp.json();

    console.log(respData);
    createUserCard(respData);

    return respData;
}

function createUserCard(user) {

    const card = `
        <div>
            <img src="${user.avatar_url}" alt="${user.name}"/>
        </div>
        <div>
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul>
                <li>${user.followers}</li>
                <li>${user.following}</li>
                <li>${user.public_repos}</li>
            </ul>
        </div>
    `;

    mainEL.innerHTML = card;
}

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = inputEl.value;

    if(name) {
        getUser(name);
    }
    
    inputEl.value = '';
})
