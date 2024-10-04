import { useSelector } from "react-redux";
import WelcomePage from "./pages/WelcomePage";
import { RootState } from "./state/store";
import GamePage from "./pages/GamePage";

function App() {

  const playWithPlayer = useSelector((state: RootState) => state.userChoice.playWithPlayer);
  const playWithComputer = useSelector((state: RootState) => state.userChoice.playWithComputer);

  return (
    <div className="w-full h-screen bg-fuchsia-950">
      {
        (playWithPlayer || playWithComputer) ? <GamePage /> : <WelcomePage />
      }
    </div>
  )
}

export default App;
