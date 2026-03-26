const form = document.getElementById("gameForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newGame = {
        title: document.getElementById("title").value,
        console: document.getElementById("console").value,
        year: document.getElementById("year").value
    };

    // Save to localStorage
    let games = JSON.parse(localStorage.getItem("games")) || [];
    games.push(newGame);
    localStorage.setItem("games", JSON.stringify(games));

    // Redirect back to collection page
    window.location.href = "index.html";
});
