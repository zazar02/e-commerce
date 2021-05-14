import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import api from './../Api/Api';

const DetailProduit = () => {

    const [produit,setProduit]=useState()
    const [load,setLoad]=useState(true)
    const location=useLocation()
    const id=location.search.substring(4)

    useEffect(() => {
        api.get("/produit/"+id).then((resp)=>{
            setProduit(resp.data)
            setLoad(false)
        })
    },[id])

    if (load) return <h1>Loading</h1>
    return (
        <div className="col-8 m-auto detailProduit ">
            <h1 className="text-center m-4">{produit.nom}</h1>
            <div className="d-flex justify-content-center mb-4">
                <img src={produit.img} alt={"image "+produit.nom}/>
            </div>
            <p className="text-center"><strong>Prix : </strong>{produit.prix} €</p>
            

        </div>
    );
};

export default DetailProduit;