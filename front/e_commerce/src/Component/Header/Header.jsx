
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Header = ({ isConnect,setConnect }) => {

	const history=useHistory()

	const [user,setUser]=useState()

	useEffect(() => {
		
	},[])





	
	const disconnect = () => {
		localStorage.clear()
		setConnect(false)
		history.push('/')
	} 

    return (
        <nav className="navbar navbar-expand-md bg-success navbar-dark mb-4">
  	        <div className="navbar-brand">
  	            <Link to="/" className="navbar-brand">E-commerce</Link>
  	        </div>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
	
	        <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
				{
					(!isConnect &&

					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to="/login" className="nav-link">Se connecter</Link>
						</li>
					</ul>)
				}
		    	
				{
					(isConnect && 
					
					<ul className="navbar-nav">
						<li className="nav-item dropdown dropleft d-flex align-items-baseline">
							<Link to="/panier" className="nav-link panier">
								<i className="fas fa-shopping-cart fa-2x">
									<span className="badge badge-danger">0</span>
								</i>
								
							
							</Link>
							<Link to="/" className="nav-link" id="navbardrop" data-toggle="dropdown">
								<i className="far fa-user-circle fa-lg"></i>
							</Link>
							<div className="dropdown-menu">
								<Link to="/profil" className="dropdown-item">Profil</Link>
								<hr></hr>
								<p onClick={disconnect} className="dropdown-item disconnect"> <i className="fas fa-power-off mr-2"></i>Se déconnecter</p>
							</div>
						<p className="text-white">pseudo</p>
						</li>
					</ul>)
				}
		    	
            </div>
        </nav>
    );
};

export default Header;