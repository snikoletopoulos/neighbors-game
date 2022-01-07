import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import ErrorBoundary from "./components/ErrorBoundary";
import { GameInfoProvider } from "./store/game-info-context";

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <GameInfoProvider>
        <App />
      </GameInfoProvider>
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById("root")
);

//TODO Reset function
//TODO Ending of game
