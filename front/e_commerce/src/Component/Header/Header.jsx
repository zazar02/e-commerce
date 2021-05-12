import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
  	        <div className="navbar-brand">
  	            <Link to="/" className="navbar-brand">E-commerce</Link>
  	        </div>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
	
	        <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
		    	<ul className="navbar-nav">
		    		<li className="nav-item">
		    			<Link to="/connect" className="nav-link" href="#" data-toggle="modal" data-target="#myModal">Se connecter</Link>
		    		</li>
		    	</ul>
		    	<ul className="navbar-nav">
				    <li className="nav-item dropdown dropleft d-flex align-items-baseline">
				        <Link to="/" className="nav-link" id="navbardrop" data-toggle="dropdown">
				            <i className="far fa-user-circle fa-lg"></i>
				        </Link>
				        <div className="dropdown-menu">
                            <Link to="/profil" className="dropdown-item">Profil</Link>
                            <hr></hr>
                            <Link to="/deconnection" className="dropdown-item"> <i className="fas fa-power-off mr-2"></i>Se déconnecter</Link>
                        </div>
				       <p className="text-white">pseudo</p>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;