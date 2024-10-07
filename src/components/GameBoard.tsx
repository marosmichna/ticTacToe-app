import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import Cell from "./Cell";
import { useCallback, useEffect, useState } from "react";


const GameBoard = () => {

    const rows = useSelector((state: RootState) => state.userChoice.rows);
    const winLine = useSelector((state: RootState) => state.userChoice.winLine);
    const playWithComputer = useSelector((state: RootState) => state.userChoice.playWithComputer);

    const [board, setBoard] = useState<string[][]>(
        Array.from({ length: rows }, () => Array(rows).fill(""))
    );

    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
    const [winner, setWinner] = useState<string | null>(null);

    const [gameStatus, setGameStatus] = useState<"PLAY" | "WIN" | "TIE" | "ERROR">("PLAY");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const checkWinner = useCallback((board: string[][]) => {
        // Function to check individual lines (rows, columns, diagonal)
        const checkLine = (line: string[]) => {
            let count = 0;
            for (let i = 0; i < line.length; i++) {
                if (line[i] === currentPlayer) {
                    count++;
                    if (count === winLine) return true; // If the sequence is equal to winLine
                } else {
                    count = 0; // Reset count if the symbol is different
                }
            }
            return false;
        };

        // Check lines
        for (let i = 0; i < rows; i++) {
            if (checkLine(board[i])) {
                return currentPlayer;
            }
        }

        // Check columns
        for (let i = 0; i < rows; i++) {
            const column = board.map(row => row[i]);
            if (checkLine(column)) {
                return currentPlayer;
            }
        }

        // Checking the main diagonal
        for (let row = 0; row <= rows - winLine; row++) {
            for (let col = 0; col <= rows - winLine; col++) {
                const diag1 = [], diag2 = [];
                for (let i = 0; i < winLine; i++) {
                    diag1.push(board[row + i][col + i]); // Main diagonal
                    diag2.push(board[row + i][col + winLine - i - 1]); // Side diagonal
                }
                if (checkLine(diag1) || checkLine(diag2)) {
                    return currentPlayer;
                }
            }
        }

        return null; // If there is no winner
    }, [currentPlayer, rows, winLine]);

    const validateGame = useCallback((newBoard: string [][], rowIndex: number, colIndex: number) => {
        // Check if the game strat with the wrong Player
        if (newBoard.flat().every(cell => cell === "") && currentPlayer !== "X") {
            setGameStatus("ERROR");
            setErrorMessage("Player X must start the game");
            return false;
        }

        // Chceck if a player play twice in a game
        const xCount = newBoard.flat().filter(cell => cell === "X").length;
        const oCOunt = newBoard.flat().filter(cell => cell === "O").length;

        if ((currentPlayer === "X" && xCount > oCOunt) || currentPlayer === "O" && xCount === oCOunt) {
            setGameStatus("ERROR");
            setErrorMessage("Players take turns makeing moves");
            return false;
        }

        if (winner) {
            setErrorMessage(`Player ${newBoard[rowIndex][colIndex]} played after game was already won`);
            setGameStatus("ERROR");
            return false;
        }

        return true;
    }, [currentPlayer, winner])

    const makeComputerMove = useCallback((board: string[][]) => {
        const emptyCells: [number, number][] = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < rows; col++) {
                if (board[row][col] === "") {
                    emptyCells.push([row, col]);
                }
            }
        }
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const [rowIndex, colIndex] = emptyCells[randomIndex];
            return { rowIndex, colIndex };
        }
        return null;
    }, [rows]);
    
    const handleCellClick = useCallback((rowIndex: number, colIndex: number) => {
        if (board[rowIndex][colIndex] !== "" || winner) return;
    
        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((row) => [...row]);
    
            if (!validateGame(newBoard, rowIndex, colIndex)) return prevBoard;
    
            newBoard[rowIndex][colIndex] = currentPlayer;
    
            const winningPlayer = checkWinner(newBoard);
            if (winningPlayer) {
                setWinner(winningPlayer);
                setGameStatus("WIN");
            } else {
                setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
            }
            return newBoard;
        });
    }, [board, currentPlayer, winner, checkWinner, validateGame]);

    // Trigger computer's turn after player's move
    useEffect(() => {
        if (playWithComputer && currentPlayer === "O" && gameStatus === "PLAY" && !winner) {
            const computerMove = makeComputerMove(board);
            if (computerMove) {
                const { rowIndex, colIndex } = computerMove;
                const timer = setTimeout(() => { 
                    handleCellClick(rowIndex, colIndex);
                }, 1000); // 1 second turn delay

                return () => clearTimeout(timer);
            }
        }
    }, [currentPlayer, playWithComputer, gameStatus, board, winner, handleCellClick, makeComputerMove]);

    // Update the game status based on winner or tie
    useEffect(() => {
        if (!winner && board.every(row => row.every(cell => cell !== ""))) {
            setGameStatus("TIE"); // If board is full and there is no winner, it is a tie
        }
    }, [board, winner]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="grid" style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
                {board.map((row, rowIndex) => (
                    <div className="flex" key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <Cell 
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                            <p className="text-white">{cell}</p>
                        </Cell>
                    ))}
                    </div>
                ))}
            </div>
            <div>
                {
                    gameStatus && <p className="text-white mt-5">Status of the Game is: <span className="ml-2 text-yellow-200">{gameStatus}</span></p>
                }
            </div>
            <div>
                {
                    (!winner && gameStatus==="PLAY") && <p className="text-white mt-5">The next Player is: <span className="ml-2">{currentPlayer}</span></p>
                }
            </div>
            <div>
                {
                    winner && <p className="text-white mt-5">The winner is Player: <span className="ml-2">{winner}</span></p>
                }
            </div>
            <div>
                {
                    (gameStatus === "TIE" && !winner) && <p className="text-white mt-5">It's a tie!</p>
                }
            </div>
            <div>
                {
                    (gameStatus === "ERROR" && errorMessage) && <p className="text-white mt-5">Error: <span className="ml-2">{errorMessage}</span></p>
                }
            </div>
        </div>
    )
}

export default GameBoard;