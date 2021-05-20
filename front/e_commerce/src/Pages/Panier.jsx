import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from './../Api/Api';


const Panier = () => {

    const [panier,setPanier]= useState()
    const [load,setLoad]=useState(true)

    useEffect(() =>{
        api.get("/commande/current-user",{ headers: {"Authorization" : "Bearer "+localStorage.getItem('token')} }).then((resp) => {
           console.log(resp.data.prodCommandes);
           setPanier(resp.data.prodCommandes)
           setLoad(false)
        })
    },[])

    if(load) return <h1>Loading...</h1>

    return (
        <div>
            <h2 className="text-center">Mon panier</h2>
            <table className="table table-panier mt-5 col-9 p-2">
                <thead>
                    <tr>
                        <th className="text-center">Produit</th>
                        <th className="text-center">Nom</th>
                        <th className="text-center">Prix</th>
                        <th className="text-center">Quantité</th>
                        <th className="text-center">Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    panier.map((prodCommande)=> {
                        return(
                            <tr>
                                <td className="text-center"><img src={prodCommande.produit.img} alt=""/></td>
                                <td className="text-center">{prodCommande.produit.nom}</td>
                                <td className="text-center">{prodCommande.produit.prix} €</td>
                                <td className="text-center">{prodCommande.quantite}</td>
                                <td className="text-center">{prodCommande.produit.prix * prodCommande.quantite} €</td>
                                <td className="text-center"> X </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default Panier;