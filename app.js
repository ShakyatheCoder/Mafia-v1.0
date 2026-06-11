// DOM elements
const createBtn = document.getElementById("createBtn");
const joinBtn = document.getElementById("joinBtn");
const startGameBtn = document.getElementById("startGameBtn");
const playerNameInput = document.getElementById("playerName");
const roomDiv = document.getElementById("roomDiv");
const roomTitle = document.getElementById("roomTitle");
const playerListEl = document.getElementById("playerList");

// Game state
let players = [];
let roomCode = "";

// Helpers
function generateRoomCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for(let i=0;i<6;i++){
        code += chars[Math.floor(Math.random()*chars.length)];
    }
    return code;
}

function updatePlayerList() {
    playerListEl.innerHTML = "";
    players.forEach(p => {
        const li = document.createElement("li");
        li.innerText = p;
        playerListEl.appendChild(li);
    });
    startGameBtn.disabled = players.length < 5 || players.length > 15;
}

// Button events
createBtn.onclick = () => {
    const name = playerNameInput.value.trim();
    if(!name){ alert("Enter your name!"); return;}
    players.push(name);
    roomCode = generateRoomCode();
    roomTitle.innerText = `Room Code: ${roomCode}`;
    roomDiv.classList.remove("hidden");
    updatePlayerList();
};

joinBtn.onclick = () => {
    const name = playerNameInput.value.trim();
    if(!name){ alert("Enter your name!"); return;}
    const code = prompt("Enter room code:");
    if(!code){ alert("No room code entered"); return;}
    roomCode = code.toUpperCase();
    players.push(name);
    roomTitle.innerText = `Room Code: ${roomCode}`;
    roomDiv.classList.remove("hidden");
    updatePlayerList();
};

// Start game
startGameBtn.onclick = () => {
    localStorage.setItem("players", JSON.stringify(players));
    window.location.href = "game.html";
};
