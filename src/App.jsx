import { useState } from "react";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const MAX_PIECES = 3;

function findWinLine(board) {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return line;
    }
  }
  return null;
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [selected, setSelected] = useState(null);
  const [winLine, setWinLine] = useState(null);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const piecesOnBoard = (player) => board.filter((c) => c === player).length;
  const isPlacing = piecesOnBoard(turn) < MAX_PIECES;

  function finishMove(nextBoard) {
    setBoard(nextBoard);
    setSelected(null);
    const line = findWinLine(nextBoard);
    if (line) {
      setWinLine(line);
      setWinner(turn);
      setScores((s) => ({ ...s, [turn]: s[turn] + 1 }));
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  }

  function handleClick(i) {
    if (winner) return;

    if (isPlacing) {
      if (board[i] !== null) return;
      const next = [...board];
      next[i] = turn;
      finishMove(next);
      return;
    }

    // moving phase
    if (board[i] === turn) {
      setSelected(selected === i ? null : i);
      return;
    }
    if (board[i] === null && selected !== null) {
      const next = [...board];
      next[selected] = null;
      next[i] = turn;
      finishMove(next);
    }
  }

  function restart() {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setSelected(null);
    setWinLine(null);
    setWinner(null);
  }

  let status;
  if (winner) {
    status = `${winner} wins!`;
  } else if (isPlacing) {
    status = `${turn}'s turn: place a piece (${
      MAX_PIECES - piecesOnBoard(turn)
    } left)`;
  } else if (selected === null) {
    status = `${turn}'s turn: select one of your pieces`;
  } else {
    status = `${turn}'s turn: click an empty cell to move`;
  }

  return (
    <div className="app">
      <header className="header">
        <p className="eyebrow">A little strategy goes a long way</p>
        <h1>
          Tic-Tac-<span>Hop</span>
        </h1>
        <p className="subtitle">Three pieces each. Keep moving. Make your line.</p>
      </header>

      <main className="game-card">
        <div className="scores" role="group" aria-label="Scores">
          <div
            className={`score-card score-x${turn === "X" && !winner ? " active" : ""}`}
          >
            <span className="player-mark">X</span>
            <span className="player-score">{scores.X}</span>
          </div>
          <div
            className={`score-card score-o${turn === "O" && !winner ? " active" : ""}`}
          >
            <span className="player-mark">O</span>
            <span className="player-score">{scores.O}</span>
          </div>
        </div>

        <p
          className={`status${winner ? " status-winner" : ""}`}
          aria-live="polite"
        >
          {status}
        </p>

        <div className="board" aria-label="Tic-Tac-Hop board">
          {board.map((cell, i) => {
            const classes = ["cell"];
            if (cell) classes.push(cell === "X" ? "x" : "o");
            if (selected === i) classes.push("selected");
            if (winLine && winLine.includes(i)) classes.push("win");
            return (
              <button
                key={i}
                className={classes.join(" ")}
                onClick={() => handleClick(i)}
                aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ", empty"}`}
              >
                {cell}
              </button>
            );
          })}
        </div>

        <button className="restart" onClick={restart}>
          <span aria-hidden="true">↻</span> New game
        </button>
      </main>

      <footer className="footer">
        Made with <span className="heart">❤️</span> by{" "}
        <span className="creator">Shivakant Shukla</span>
      </footer>
    </div>
  );
}
