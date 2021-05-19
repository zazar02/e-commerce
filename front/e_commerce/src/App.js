import { BrowserRouter } from "react-router-dom";
import Header from "./Component/Header/Header";
import Routes from "./Routes/Routes";
import { Component } from "react";

class App extends Component {

	state = {
        isConnect: false,
		panier:null,
    }


    setConnect = (bool) => {
        this.setState({ isConnect: bool})
    }

	setPanier = (commande) => {
        this.setState({ panier: commande})
    }


	render() {
		return (
			<BrowserRouter>
				<Header isConnect={this.state.isConnect} setConnect={this.setConnect}/>
				<Routes isConnect={this.state.isConnect} setConnect={this.setConnect}/>
			</BrowserRouter>
		);
	}
	
}

export default App;
