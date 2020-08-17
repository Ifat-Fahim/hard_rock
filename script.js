// Selectors
const lyricsInput = document.getElementById("lyrics-input");
const searchBtn = document.getElementById("search-btn");
const singers = document.querySelectorAll(".singer");
const songs = document.querySelectorAll(".song-title");
const lyricsTitle = document.getElementById("lyrics-title");
const getLyrics = document.getElementById("get-lyrics");
const lyrics = document.getElementById("lyrics");
const resultContainer = document.getElementById("result-container");
const url = "https://api.lyrics.ovh";

//Event handlers
searchBtn.addEventListener("click", () => {
    getResult(lyricsInput.value);
});
resultContainer.addEventListener("click", (event) => {
    const clickedBtn = event.target;
    const songTitle =
        clickedBtn.parentElement.previousElementSibling.children[0].innerText;
    const songArtist =
        clickedBtn.parentElement.previousElementSibling.children[0]
            .nextElementSibling.children[0].innerText;
    if (clickedBtn.tagName === "BUTTON") {
        showLyrics(songArtist, songTitle);
    }
});

//Fetch API anc functions
function getResult(title) {
    fetch(`${url}/suggest/${title}`)
        .then((res) => res.json())
        .then((data) => {
            showResult(data);
        });
}
function showResult(info) {
    for (let i = 0; i < 10; i++) {
        singers[i].innerText = info.data[i].artist.name;
        songs[i].innerText = info.data[i].title;
    }
}

function showLyrics(artist, title) {
    fetch(`${url}/v1/${artist}/${title}`)
        .then((res) => res.json())
        .then((lyrics) => {
            setLyrics(lyrics);
        });
}

function setLyrics(songLyrics) {
    lyrics.innerText = songLyrics.lyrics;
}
