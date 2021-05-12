import React from 'react';
import ListProduits from '../Component/Produits/ListProduits';

const Home = () => {
    return (
        <div>
            <h1 className="text-center my-4">Liste des produits</h1>
            <ListProduits/>
        </div>
    );
};

export default Home;