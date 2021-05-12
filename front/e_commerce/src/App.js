import { BrowserRouter } from "react-router-dom";
import Header from "./Component/Header/Header";
import Routes from "./Routes/Routes";

function App() {
	return (
		<BrowserRouter>
			<Header/>
			<Routes/>
		</BrowserRouter>
	);
}

export default App;
