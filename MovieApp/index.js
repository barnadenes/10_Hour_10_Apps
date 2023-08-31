const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const mainEl = document.querySelector("main");
const formEl = document.querySelector("#search-form");
const inputEl = document.querySelector(".search");

getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const movieData = await resp.json();

  console.log(movieData);

  searchMovies(movieData.results);
}

function searchMovies(movies) {
  mainEl.innerHTML = "";

  movies.forEach((movie) => {
    const { title, vote_average, poster_path } = movie;

    mainEl.innerHTML += `
    <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w1280${poster_path}"  alt="${title}">
        <div class="movie-info">
            <h4>${title}</h4>
            <span class="${rateColor(vote_average)}">${vote_average}</span>
        </div>
    </div>`;

    document.body.appendChild(mainEl);
  });
}

function rateColor(rating) {
  if (rating >= 8) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = inputEl.value;

  if(searchValue) {
    getMovies(SEARCHAPI + searchValue);

    searchValue.value = '';
  }
});
