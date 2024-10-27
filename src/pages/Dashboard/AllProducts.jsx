import React from 'react';
import { Link } from 'react-router-dom';

const AllProducts = () => {
    return (
        <div>
            <Link to={"/dashboard/add-product"}>Add product</Link>
        </div>
    );
};

export default AllProducts;