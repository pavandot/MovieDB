import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
import store from "./app/store";
import App from "./App";

// create a query client
const queryClient = new QueryClient();

ReactDOM.render(
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<App />
			</Provider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
