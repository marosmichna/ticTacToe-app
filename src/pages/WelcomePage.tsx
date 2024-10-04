import { H1 } from "../components/tailwind/H1";
import { H2 } from "../components/tailwind/H2";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { setPlayWithComputer, setPlayWithPlayer, setRows, setWinLine } from "../state/userChoice";


const rowCellLineArray = [3, 4, 5, 6, 7, 8, 9, 10];

const WelcomePage = () => {

  const dispatch = useDispatch<AppDispatch>();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        dispatch(setRows(value));
  };

  const handleWinLineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        dispatch(setWinLine(value));
  };

  const rows = useSelector((state: RootState) => state.userChoice.rows);

  const winLineArray = Array.from({ length: rows - 2 }, (_, i: number) => i + 3); // Creating a array with a max row value

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
        <div className="bg-slate-400 px-2 py-2 rounded-xl">
            <H1 className="text-white my-5">Tic Tac Toe</H1>
            <H2 className="text-white mb-5">Welcome to this game</H2>

            <div className="w-96">
                <div className="flex justify-between items-center mb-5">
                    <p>Please choice number of rows</p>
                    <Select                       
                        onChange={handleSelectChange}
                        rowCellLine = {rowCellLineArray}
                    />
                </div>
                <div className="flex justify-between items-center mb-5">
                    <p>Please choice number of win line</p>
                    <Select 
                        onChange={handleWinLineChange}           
                        winLine = {winLineArray}
                    />
                </div>

            </div>

            <div className="flex flex-col">
                <Button 
                    className="my-5"
                    buttonText="Play with other Player"
                    onClick={() => dispatch(setPlayWithPlayer(true))}
                />
                <Button 
                    variant="withComputer"
                    className="mb-5"
                    buttonText="Play with Computer"
                    onClick={() => dispatch(setPlayWithComputer(true))}
                />
            </div>

        </div>
    </div>
  )
}

export default WelcomePage;