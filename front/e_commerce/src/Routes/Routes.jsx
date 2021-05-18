import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './../Pages/Home';
import NotFound from './../Pages/NotFound';
import DetailProduit from './../Pages/DetailProduit';
import Login from '../Pages/Login';

class Routes extends Component {

   
    render() {
        const {setConnect}=this.props
        return (
            <Switch>
				<Route exact path="/" component={Home}/>
                <Route exact path="/produit" component={DetailProduit}/>
                <Route exact path="/login">
                    <Login setConnect={setConnect}/>
                </Route>
                <Route component={NotFound}/>
			</Switch>
        );
    }
}

export default Routes;