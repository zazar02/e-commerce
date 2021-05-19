import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from './../Api/Api';


const Panier = () => {

    const [panier,setPanier]= useState()

    useEffect(() =>{
        api.get("/commandes",{ headers: {"Authorization" : "Bearer "+localStorage.getItem('token')} }).then((resp) => {
           console.log(resp);
        })
    },[])


    return (
        <div>
            <h2>Mon panier</h2>
        </div>
    );
};

export default Panier;