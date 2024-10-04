import GameBoard from "../components/GameBoard";
import { H1 } from "../components/tailwind/H1";


const GamePage = () => {

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <H1 className="text-white my-5">Tic Tac Toe</H1>
            <GameBoard />
        </div>
    )
}

export default GamePage;

