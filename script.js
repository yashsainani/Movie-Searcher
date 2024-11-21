const input = document.getElementById('input');
const movies = document.querySelector('.movies-section');
const apiKey = 'ad2de5fa';
async function showMovies() {
    try {
        let search = input.value;
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}&type=movie&page=1`);
        if (!res.ok) throw new Error("Error in fetching data");
        const data = await res.json();
        console.log(data);
        movies.innerHTML = "";
        data.Search.sort((a, b) => b.Year - a.Year);
        data.Search.forEach(obj => {
            if (obj.Poster !== "N/A") {
                let div = `
                    <div class="movie">
                        <img src="${obj.Poster}" alt="${obj.Title}" width=200px height=200px>
                        <h1 id="title">Movie : ${obj.Title}</h1>
                        <h1 id="year">Year : ${obj.Year}</h1>
                    </div>
                `;
                movies.innerHTML += div;
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}

function debounce(fun, del) {
    let timer;
    return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fun, del);
    }
}

const debounced = debounce(showMovies, 300);

input.addEventListener('keydown', debounced);