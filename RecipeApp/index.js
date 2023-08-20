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

    btnEL.addEventListener('click', () => {
        if(btnEL.classList.contains('active')) {
            removeMealFromlS(mealData.idMeal)
            btnEL.classList.remove("active");
        }
        else {
            addMealToLS(mealData.idMeal)
            btnEL.classList.add("active");
        }
    })
}

function addMealToFav(mealData) {

    favoriteEl.innerHTML += `<li>
    <img
      src="${mealData.strMealThumb}
                "
      alt="${mealData.strMeal}"
    /><span>${mealData.strMeal}</span>
  </li>`

}

function addMealToLS(mealID) {
    const mealIds = getMealFromLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealID]));
}

function getMealFromLS() {
    const mealIds = localStorage.getItem("mealIds");

    return mealIds === null ? [] : mealIds;
}

function removeMealFromlS(mealID) {
    const mealIds = getMealFromLS();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealID)));
}

async function fetchFavMeals() {
    const mealIds = getMealFromLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);

        addMealToFav(meal);
    }    
}

getRandomMeal();
fetchFavMeals();