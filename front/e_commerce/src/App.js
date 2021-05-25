import { BrowserRouter } from "react-router-dom";
import Header from "./Component/Header/Header";
import Routes from "./Routes/Routes";
import { Component } from "react";

class App extends Component {

	state = {
        isConnect: false,
		panier:[],
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
				<Header isConnect={this.state.isConnect} setConnect={this.setConnect} panier={this.state.panier} setPanier={this.setPanier}/>
				<Routes isConnect={this.state.isConnect} setConnect={this.setConnect} panier={this.state.panier} setPanier={this.setPanier}/>
			</BrowserRouter>
		);
	}
	
}

export default App;
