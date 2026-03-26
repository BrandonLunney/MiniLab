const form = document.getElementById("gameForm");
const gameList = document.getElementById("gameList");

let games = [];

// Load from database
async function loadGames() {
    const res = await fetch("api.php");
    games = await res.json();
    renderGames();
}

function getConsoleImage(consoleType) {
    return consoleType === "NES" ? "images/NES.png" : "images/SNES.png";
}

// Render games
function renderGames() {
    gameList.innerHTML = "";

    games.forEach((game) => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <div class="card-content">
                <img class="console-icon" src="${getConsoleImage(game.console)}" />
                
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <p>${game.console} | ${game.year || "Unknown"}</p>
                </div>

                <button class="remove-btn" data-id="${game.id}">Remove</button>
            </div>
        `;

        gameList.appendChild(div);
    });

    // Remove from database
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.dataset.id;

            await fetch(`api.php?id=${id}`, {
                method: "DELETE"
            });

            loadGames();
        });
    });
}

// Handle form submit → SAVE TO DATABASE
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newGame = {
        title: document.getElementById("title").value,
        console: document.getElementById("console").value,
        year: document.getElementById("year").value
    };

    await fetch("api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGame)
    });

    form.reset();
    loadGames();
});

// Initial load
loadGames();