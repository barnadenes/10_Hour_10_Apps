const dailyMealEl = document.getElementById('daily-meal');
const footerEl = document.getElementById('rating');
const favoriteEl = document.getElementById('meal-ul');

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respJson = await resp.json();
    const randomMeal = respJson.meals[0];

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);

    const resData = await resp.json();
    const meal = resData.meals[0];

    return meal;
}

async function getMealBySearch(meal) {
    const meals = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal);
}

function addMeal(mealData, random = false) {

    dailyMealEl.innerHTML = `${random ? `<span class="random">Recipe of the day</span>` : ''}`+
    `<img
      src="${mealData.strMealThumb}"
      alt="${mealData.Meal}"
    />`

    footerEl.innerHTML = 
    `<h5>${mealData.strMeal}</h5>
    <button class="fav-btn">
        <i class="fas fa-heart"></i>
    </button>`

    const btnEL = document.querySelector('.fav-btn');
    const ls = getMealFromLS();

    btnEL.addEventListener('click', () => {
            addMealToLS(mealData.idMeal)
            fetchFavMeals();     
    })
}


function addMealToFav(mealData) {
    const liEl = document.createElement('li');
    favoriteEl.appendChild(liEl);
    const imgEl = document.createElement('img');

    imgEl.setAttribute('src', `${mealData.strMealThumb}`);
    imgEl.setAttribute('alt', `${mealData.strMeal}`);
    imgEl.setAttribute('title', `${mealData.strMeal}`);
    liEl.appendChild(imgEl);

    const spanEl = document.createElement('span');

    spanEl.setAttribute('title', `${mealData.strMeal}`);
    spanEl.innerHTML = `${mealData.strMeal}`;
    liEl.append(spanEl);


    const buttonEl = document.createElement('button');

    buttonEl.setAttribute('class', 'fav-cancel');
    buttonEl.setAttribute('id', `${mealData.idMeal}`);
    liEl.append(buttonEl);

    const iconEl = document.createElement('i');

    iconEl.setAttribute('class', 'fa-solid fa-x');
    buttonEl.appendChild(iconEl);

    buttonEl.addEventListener('click', () => {
        removeMealFromlS(mealData.idMeal);
    });

}

function addMealToLS(mealID) {
    const mealIds = getMealFromLS();

        if(!mealIds.includes(mealID)) {
            localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealID]));
        }
        else {
            return null;
        }
}

function getMealFromLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}

function removeMealFromlS(mealID) {
    const mealIds = getMealFromLS();

    localStorage.setItem(
        "mealIds",
        JSON.stringify(mealIds.filter((id) => id !== mealID))
    );

    fetchFavMeals();
}

async function fetchFavMeals() {
    favoriteEl.innerHTML = '';

    let mealIds = getMealFromLS();

    for (let i = 0; i < mealIds.length; i++) {
        let mealId = mealIds[i];
        meal = await getMealById(mealId);

        addMealToFav(meal, true);
    }    
}

getRandomMeal();
fetchFavMeals();