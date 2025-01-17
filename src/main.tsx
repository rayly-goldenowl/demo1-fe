import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/tailwind.css";
import "./common/i18n";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});
const clientid =
	"1052714305078-bia0hgeslimmguuje7vkagiqro85e9u1.apps.googleusercontent.com";
const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<GoogleOAuthProvider clientId={clientid}>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<App />
					</QueryClientProvider>
				</BrowserRouter>
			</GoogleOAuthProvider>
		</React.StrictMode>
	);
}
