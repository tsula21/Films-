const API_KEY = "8fdfd915-dc7e-4b4e-91ab-df29e11ce8b0";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
const form = document.querySelector('form');
const search = document.querySelector('.header-search');

getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            'X-API-KEY': API_KEY,
        }
    });
    const respData = await resp.json();
    showMovies(respData);
}

function getClassByRate(vote){
    if(vote >= 7){
        return "green";
    }else if(vote > 5) {
        return "orange";
    }else{
        return "red";
    } 
}

function showMovies(data){
    const moviesEL = document.querySelector('.movies');

    document.querySelector('.movies').innerHTML = "";

    data.films.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML =    `
        <div class="movie_cover-inner">
          <img class="movie-cover" src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
          <div class="movie-cover-dark"></div>
        </div>
        <div class="movie-info">
          <div class="movie-title">${movie.nameRu}</div>
          <div class="movie-category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
          <div class="movie_average movie-average-${getClassByRate(movie.rating)}">${movie.rating}</div>
        </div>
        `;
        moviesEL.appendChild(movieEl);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if(search.value){
        getMovies(apiSearchUrl);
        search.value = "";
    }
});