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
        if(!ls.includes(mealData.idMeal)) {
            addMealToLS(mealData.idMeal)
            fetchFavMeals();
        }
        else {
            
        }
    })
}

function onprogress() {

}

function addMealToFav(mealData) {

    favoriteEl.innerHTML += `<li>
    <img
      src="${mealData.strMealThumb}
                "
      alt="${mealData.strMeal}"
      title="${mealData.strMeal}"
    /><span title="${mealData.strMeal}" >${mealData.strMeal}</span>
    <button class="fav-cancel" id="${mealData.idMeal}" ><i class="fa-solid fa-x"></i></button>
  </li>`

    const cancelBtn = document.getElementById(`${mealData.idMeal}`);

    cancelBtn.addEventListener('click', () => {
        removeMealFromlS(mealData.idMeal);
    })

}

function addMealToLS(mealID) {
    const mealIds = getMealFromLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealID]));
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

    const mealIds = getMealFromLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);

        addMealToFav(meal);
    }    
}

getRandomMeal();
fetchFavMeals();