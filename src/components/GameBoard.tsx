import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import Cell from "./Cell";
import { useState } from "react";


const GameBoard = () => {

    const rows = useSelector((state: RootState) => state.userChoice.rows);
    const winLine = useSelector((state: RootState) => state.userChoice.winLine);

    const [board, setBoard] = useState<string[][]>(
        Array.from({ length: rows }, () => Array(rows).fill(""))
    );

    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
    const [winner, setWinner] = useState<string | null>(null);

    const checkWinner = (board: string[][]) => {
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
    };

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        if (board[rowIndex][colIndex] !== "" || winner) return; // If the cell is already occupied or there is a winner, it does nothing

        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((row) => [...row]);
            newBoard[rowIndex][colIndex] = currentPlayer;

            const winningPlayer = checkWinner(newBoard);
            if (winningPlayer) {
                setWinner(winningPlayer);
            } else {
                setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // Player change
            }
            return newBoard;
        });
    };

    console.log(board)
    console.log(winner)

    return (
        <div className="flex items-center justify-center">
            <div className="grid" style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
            {board.map((row, rowIndex) => (
                <div className="flex" key={rowIndex}>
                {row.map((cell, colIndex) => (
                    <Cell 
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                        {cell}
                    </Cell>
                ))}
                </div>
            ))}
            </div>
        </div>
    )
}

export default GameBoard;