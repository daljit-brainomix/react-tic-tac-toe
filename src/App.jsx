import { useState } from 'react'
// import './App.css'
import './game.css'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Square = (props) => {
  console.log(props)
  return (
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>
  );
}

const Board = (props) => {  
  const renderSquare = (i) => {
    return (
      <Square 
        value={props.squares[i]} 
        onClick={() => props.onClick(i)}        
        />
    );
  }

  return (
    <div>
      <div className="board-row">    
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function App() {

  const [board, setBoard] = useState({
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    xIsNext: true,
  })

  const history = board.history;
  const current = history[board.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => handleJumpTo(move)}>{desc}</button>
      </li>
    );
  })

  let status;
  if (winner) {
    status = 'Winner: '+ winner;
  } else {
    status = 'Next player: '+ (board.xIsNext ? 'X' : 'O');
  }

  const handleJumpTo = (step) => {
    setBoard({
      ...board,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }  

  const handleClick = (i) => {
    const history = board.history.slice(0, board.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = board.xIsNext ? 'X' : 'O';

    setBoard({
      ...board,
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !board.xIsNext,
    });
  }

  return (
    <>
    <h1>Tic Tac Toe</h1>
    <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => handleClick(i)}
            />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}

export default App
