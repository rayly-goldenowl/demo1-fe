import userRouteElements from "./routes/userRouteElements";

function App() {
	const routeElements = userRouteElements();
	return <div>{routeElements}</div>;
}

export default App;
