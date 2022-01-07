import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { GameInfoProvider } from "./store/game-info-context";
ReactDOM.render(
  <StrictMode>
      <GameInfoProvider>
    <App />
      </GameInfoProvider>
  </StrictMode>,
  document.getElementById("root")
);

//TODO Reset function
//TODO Ending of game
