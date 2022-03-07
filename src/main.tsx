import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import ErrorBoundary from "components/ErrorBoundary";
import { Provider } from "react-redux";
import store from "store";

ReactDOM.render(
	<StrictMode>
		<ErrorBoundary>
			<Provider store={store}>
				<App />
			</Provider>
		</ErrorBoundary>
	</StrictMode>,
	document.getElementById("root")
);
