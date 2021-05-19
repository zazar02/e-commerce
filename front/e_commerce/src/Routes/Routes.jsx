import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './../Pages/Home';
import NotFound from './../Pages/NotFound';
import DetailProduit from './../Pages/DetailProduit';
import Login from '../Pages/Login';
import Panier from '../Pages/Panier';

class Routes extends Component {

   
    render() {
        const {isConnect,setConnect}=this.props
        return (
            <Switch>
                <Route exact path="/login">
                    <Login setConnect={setConnect}/>
                </Route>
                <Route exact path="/" component={Home}/>
                <Route exact path="/produit" component={DetailProduit}/>
                {
                    (isConnect && <Route exact path="/panier" component={Panier}/>)
                }
                <Route component={NotFound}/>
			</Switch>
        );
    }
}

export default Routes;