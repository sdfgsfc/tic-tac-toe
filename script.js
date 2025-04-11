// Tableau qui représente les 9 cases du plateau (valeurs : "", "X" ou "O")
let board = ["", "", "", "", "", "", "", "", ""];

// Joueur actuel : "X" commence
let currentPlayer = "X";

// Variable pour savoir si la partie est terminée
let gameOver = false;

// Combinaisons gagnantes (index des cases)
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Récupère toutes les div.cell
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("reset-btn");

// Au clic sur une cellule, on joue un coup
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

// Gère le clic sur une cellule
function handleCellClick(e) {
  // Si la partie est terminée ou si la case est déjà occupée, on ne fait rien
  if (gameOver) return;
  const index = e.target.getAttribute("data-index");

  if (board[index] !== "") return;

  // Place le symbole du joueur dans board
  board[index] = currentPlayer;
  // Met à jour l'affichage
  e.target.textContent = currentPlayer;

  // Vérifie si on a un gagnant ou une égalité
  checkWinOrDraw();

  // Si la partie n'est pas finie, on passe au joueur suivant
  if (!gameOver) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Vérifie l'état du jeu
function checkWinOrDraw() {
  // Vérifie chaque combinaison gagnante
  for (let combo of winningCombinations) {
    let [a, b, c] = combo;
    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      alert(`Le joueur ${board[a]} a gagné !`);
      gameOver = true;
      return;
    }
  }

  // Vérifie l'égalité (toutes les cases sont remplies)
  if (!board.includes("")) {
    alert("Match nul !");
    gameOver = true;
  }
}

// Réinitialise la partie
resetBtn.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  cells.forEach(cell => {
    cell.textContent = "";
  });
});