import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import api from './../Api/Api';
import { useHistory } from 'react-router-dom';

const DetailProduit = () => {

    const [produit,setProduit]=useState()
    const [load,setLoad]=useState(true)
    const [qte,setqte]=useState(1)
    const history=useHistory()
    const location=useLocation()
    const id=location.search.substring(4)

    useEffect(() => {
        api.get("/produit/"+id).then((resp)=>{
            setProduit(resp.data)
            setLoad(false)
        })
    },[id])

    const decrementQte = () => {
        if(qte!==1){
            setqte(qte-1)
        }
    }

    const incrementQte = () => {
        if(qte!==10){
            setqte(qte+1)
        }
    }

    const submit = () => {
        history.push("/")
    }


    if (load) return <h1>Loading</h1>
    return (
        <div className="col-8 m-auto detailProduit ">
            <h1 className="text-center m-4">{produit.nom}</h1>
            <div className="d-flex justify-content-center mb-4">
                <img src={produit.img} alt={"image "+produit.nom}/>
            </div>
            <p className="text-center"><strong>Prix : </strong>{produit.prix} €</p>

            <form className="d-flex justify-content-center align-items-baseline">
                <button onSubmit={submit} className="btn btn-success mr-5">Ajouter au panier</button>

                <label>Quantité :</label>

                <div className="input-group w-auto ml-2">
                    <div className="input-group-prepend">
                        <button type="button" onClick={decrementQte} className="input-group-text bg-success text-white">-</button>
                    </div>
                    <input name="quantite" type="text" className="form-control input-qte" readOnly value={qte}/>
                    <div className="input-group-append">
                        <button type="button" onClick={incrementQte} className="input-group-text bg-success text-white">+</button>
                    </div>
                </div>
            </form>
            
            

        </div>
    );
};

export default DetailProduit;