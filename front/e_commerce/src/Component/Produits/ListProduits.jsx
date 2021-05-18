import React, { useEffect, useState } from 'react';
import api from './../../Api/Api';
import CardProduit from './CardProduit';

const ListProduits = () => {

    const [produits,setProduits]=useState()
    const [load,setLoad]=useState(true)
    const [categories,setCategories]=useState()
    const [selectedCategorie,setSelectedCategorie]=useState("")


    useEffect(() => {
        if(selectedCategorie===""){
            api.get("/produits").then((resp)=>{
                setProduits(resp.data)
                api.get("/categories").then((resp2) =>{
                    setCategories(resp2.data)
                    setLoad(false)
                })
            })
        }
        else{
            api.get("/produits/"+selectedCategorie).then((resp)=>{
                setProduits(resp.data)
                api.get("/categories").then((resp2) =>{
                    setCategories(resp2.data)
                    setLoad(false)
                })
            })
        }
        
    },[selectedCategorie])

    if (load) return <h1>Loading</h1>
    return (
        
        <div className="row m-2">
            <div className="col-2">
                <h4>Categorie</h4>
                <hr></hr>
                <ul className="nav flex-column nav-pills">
                    <li className="nav-item">
                        <p className="nav-link cat-link" data-toggle="pill" onClick={() => setSelectedCategorie("")}>all</p>   
                    </li>
                    {
                        categories.map((categorie) => {
                            return (
                                    <li className="nav-item" key={categorie.id}>
                                        <p className="nav-link cat-link" data-toggle="pill" onClick={() => setSelectedCategorie(categorie.nom)}>{categorie.nom} </p>   
                                    </li>
                                )
                        })
                    }
                </ul>
            </div>
            <div className="col-10 d-flex flex-wrap">
                {
                    produits.map((prod) => {
                        return(<CardProduit key={prod.id} produit={prod}/>)
                    })
                }
            </div>

            
        </div>
    );
};

export default ListProduits;