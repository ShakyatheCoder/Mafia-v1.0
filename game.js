let room = JSON.parse(localStorage.getItem("room"));
let me = room.players[room.players.length - 1];

const phase = document.getElementById("phase");
const playersDiv = document.getElementById("players");
const roleDiv = document.getElementById("role");
const chatDiv = document.getElementById("chat");

function renderPlayers() {
  playersDiv.innerHTML = "";
  room.players.forEach(p => {
    let d = document.createElement("div");
    d.innerText = p;
    playersDiv.appendChild(d);
  });
}

function assignRoles() {
  let count = room.players.length;
  let mafiaCount = count <= 6 ? 1 : count <= 9 ? 2 : 3;
  let roles = Array(count).fill("Citizen");
  for (let i = 0; i < mafiaCount; i++) roles[i] = "Mafia";
  roles.sort(() => Math.random() - 0.5);
  room.roles = roles;
  localStorage.setItem("room", JSON.stringify(room));

  let myIndex = room.players.indexOf(me);
  roleDiv.innerText = "Your Role: " + roles[myIndex];
}

function startGame() {
  if (room.players.length < 5) {
    alert("Need at least 5 players");
    return;
  }
  room.started = true;
  phase.innerText = "NIGHT";
  assignRoles();
  localStorage.setItem("room", JSON.stringify(room));
}

document.getElementById("start").onclick = startGame;

function sendMsg() {
  let input = document.getElementById("msg");
  if (!input.value) return;
  let msg = document.createElement("div");
  msg.innerText = me + ": " + input.value;
  chatDiv.appendChild(msg);
  chatDiv.scrollTop = chatDiv.scrollHeight;
  input.value = "";
}

renderPlayers();
