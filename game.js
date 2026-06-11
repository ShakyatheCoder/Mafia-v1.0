// DOM elements
const roleDisplay = document.getElementById("roleDisplay");
const phaseDisplay = document.getElementById("phaseDisplay");
const messagesDiv = document.getElementById("messages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const voteList = document.getElementById("voteList");

// Game state
let players = JSON.parse(localStorage.getItem("players")) || [];
let mafiaCount = players.length <= 6 ? 1 : (players.length <=9 ? 2 : 3);
let roles = Array(players.length).fill("Citizen");
for(let i=0;i<mafiaCount;i++) roles[i]="Mafia";
roles.sort(()=> Math.random()-0.5);

let myName = prompt("Enter your player name again:");
let myIndex = players.indexOf(myName);
let myRole = roles[myIndex];

roleDisplay.innerText = `Your Role: ${myRole}`;
phaseDisplay.innerText = "Phase: Night";

// Voting setup
function setupVote() {
    voteList.innerHTML = "";
    players.forEach((p,i)=>{
        if(i===myIndex) return; // can't vote self
        const li = document.createElement("li");
        li.innerText = p;
        li.onclick = ()=> votePlayer(p);
        voteList.appendChild(li);
    });
}

// Chat
let chatMessages = [];

sendBtn.onclick = ()=> {
    const msg = chatInput.value.trim();
    if(!msg) return;
    chatMessages.push(`${myName}: ${msg}`);
    updateChat();
    chatInput.value="";
};

function updateChat(){
    messagesDiv.innerHTML = "";
    chatMessages.forEach(m=>{
        const div = document.createElement("div");
        div.innerText = m;
        messagesDiv.appendChild(div);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Voting logic
let votes = {};
function votePlayer(name){
    votes[myName] =
