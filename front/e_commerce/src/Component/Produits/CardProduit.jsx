import React from 'react';
import { Link } from 'react-router-dom';

const CardProduit = ({produit}) => {
    return (
        <div className="card cardProduit shadow m-4">
            <div className="card-header d-flex justify-content-center">
                <img src={produit.img} alt={produit.nom}/>
            </div>
            <div className="card-body">
                <div className="d-flex align-items-baseline justify-content-between mb-2">
                    <h3 className="card-title">{produit.nom}</h3> 
                    <p>{produit.prix} €</p>
                </div>
                <Link to={"/produit?id="+produit.id} className="btn btn-success d-block m-auto">Details</Link> 
            </div>
            
        </div>
    );
};

export default CardProduit;