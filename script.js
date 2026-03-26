const gameList = document.getElementById("gameList");

// Load games from localStorage
let games = JSON.parse(localStorage.getItem("games")) || [];

function getConsoleImage(consoleType) {
    return consoleType === "NES" ? "images/NES.png" : "images/SNES.png";
}

function renderGames() {
    gameList.innerHTML = "";

    games.forEach((game, index) => {
        const div = document.createElement("div");
        div.classList.add("card");

        const glowClass = game.console === "NES" ? "nes-glow" : "snes-glow";

        div.innerHTML = `
            <div class="card-content">
                <img class="console-icon ${glowClass}" src="${getConsoleImage(game.console)}" />
                
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <p>${game.console} | ${game.year || "Unknown"}</p>
                </div>

                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;

        gameList.appendChild(div);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const i = e.target.dataset.index;
            games.splice(i, 1);
            localStorage.setItem("games", JSON.stringify(games));
            renderGames();
        });
    });
}

// Initial render
renderGames();
