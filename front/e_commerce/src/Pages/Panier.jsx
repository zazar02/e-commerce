import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from './../Api/Api';


const Panier = () => {

    const [panier,setPanier]= useState()
    const [load,setLoad]=useState(true)

    var total = 0

    useEffect(() =>{
        api.get("/commande/current-user").then((resp) => {
           console.log(resp.data.prodCommandes);
           setPanier(resp.data.prodCommandes)
           setLoad(false)
        })
    },[])

    if(load) return <h1>Loading...</h1>

    if(!panier) return(
        <div>
            <h2 className="text-center mb-5">Mon panier</h2>
            <p className="p-2"><stong>Votre panier est vide</stong></p>
        </div>
    )

    return (
        <div>
            <h2 className="text-center mb-5">Mon panier</h2>
            <div className="row px-3">
                <div className="col-9">
                    <table className="table table-panier border">
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

                                var subTotal=prodCommande.produit.prix * prodCommande.quantite
                                total += subTotal
                                return(
                                    <tr>
                                        <td className="text-center"><img src={prodCommande.produit.img} alt=""/></td>
                                        <td className="text-center">{prodCommande.produit.nom}</td>
                                        <td className="text-center">{prodCommande.produit.prix} €</td>
                                        <td className="text-center">{prodCommande.quantite}</td>
                                        <td className="text-center">{subTotal} €</td>
                                        <td className="text-center"> X </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="col-3">
                    <div className="card bg-success text-white">
                        <h2 className="text-center my-3">Recapitulatif</h2>
                        <div className="p-3">
                            <p>Nombre produit : {panier.length}</p>
                            <hr/>
                            <p>Total :  {total}  €</p>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default Panier;