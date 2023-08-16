let dailyMealEl = document.getElementById('daily-meal');
let footerEl = document.getElementById('rating');
let favoriteEl = document.getElementById('meal-ul');

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respJson = await resp.json();
    const randomMeal = respJson.meals[0];

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const meal = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
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
        btnEL.classList.toggle("active");
    })
}


function addMealToLS(meal) {

}

function getMealFromLS() {
    const mealIds = localStorage.getItem('mealIds');
}

getRandomMeal();
