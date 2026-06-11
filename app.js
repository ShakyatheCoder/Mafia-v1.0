const nameInput = document.getElementById("name");
const status = document.getElementById("status");

let room = JSON.parse(localStorage.getItem("room")) || null;

function saveRoom() {
  localStorage.setItem("room", JSON.stringify(room));
}

function createRoom() {
  if (room) {
    status.innerText = "You already have a room. Refresh to reset.";
    return;
  }

  const name = nameInput.value.trim();
  if (!name) return status.innerText = "Enter your name";

  room = {
    code: Math.random().toString(36).substring(2, 7).toUpperCase(),
    host: name,
    players: [name],
    started: false
  };

  saveRoom();
  status.innerText = "Room created: " + room.code;

  setTimeout(() => {
    location.href = "game.html";
  }, 800);
}

function joinRoom() {
  const name = nameInput.value.trim();
  if (!name) return status.innerText = "Enter your name";

  let code = prompt("Enter room code:");
  if (!code) return;

  code = code.toUpperCase();

  let existing = JSON.parse(localStorage.getItem("room"));

  if (!existing || existing.code !== code) {
    status.innerText = "Room not found";
    return;
  }

  if (existing.players.includes(name)) {
    status.innerText = "Already in room";
    return;
  }

  if (existing.players.length >= 15) {
    status.innerText = "Room full";
    return;
  }

  existing.players.push(name);
  room = existing;
  saveRoom();

  setTimeout(() => {
    location.href = "game.html";
  }, 500);
}

document.getElementById("create").onclick = createRoom;
document.getElementById("join").onclick = joinRoom;
