window.onload = function() {
    const url = "https://api.themoviedb.org/3";
    const moviesExamplesContainer = document.getElementById("movies-examples-container");
    const searchField = document.getElementById("search-field");
    const searchButton = document.getElementById("search-button");
    let heading = document.getElementById("heading");
    async function getData(url) {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        return data;
    }
    let urlToSearch = url + "/movie/popular?" + new URLSearchParams({
        api_key: "c41b45b3305b9f29adb262daf83f185a",
        original_language: "en",
        sort_by: "popularity.desc",    
        page: 1,
    });
    let movies = getData(urlToSearch);  

    function getMovies(movies) {
        moviesExamplesContainer.innerHTML = "";
        movies.then(x => {
            x.results.forEach(el => {
                const template = `<div class="movie-example">
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${el.poster_path}" alt="movie poster">
                    <div class="movie-rating">${el.vote_average}</div>
                    <div class="movie-review"><div>${el.overview}</div></div>
                    <figcaption>${el.title}</figcaption>
                    <div class="movie-release">(${el.release_date.slice(0,4)})</div>
                </div>`
                moviesExamplesContainer.insertAdjacentHTML('beforeend', template);
            })
        }) 
    } 
    getMovies(movies);
    function searchMovie(e) {
        e.preventDefault();
        if (searchField.value) {
            urlToSearch = url + "/search/movie?" + new URLSearchParams({
                api_key: "c41b45b3305b9f29adb262daf83f185a",
                query: searchField.value,
            })
            heading.innerHTML = "Results of search";
            let result = getData(urlToSearch);
            getMovies(result);
        } else {
            alert("Type somthing in the search field");
        }
    }
    searchButton.addEventListener('click', searchMovie);
}
