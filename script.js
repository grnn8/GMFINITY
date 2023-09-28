const APIURL = "http://www.omdbapi.com/?s=friends&apikey=fefed7e2";




const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// initially get fav movies (by popularity)
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.Search);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { Poster, Title, Year, Type } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${Poster}"
                alt="${Title}"/>
            <div class="movie-info">
                <h3>${Title}</h3>
                <span class="green">${Year}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${Type}
            </div>`;

        main.appendChild(movieEl);
    });
}



form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(`https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fefed7e2`);

        search.value = "";
    }
});