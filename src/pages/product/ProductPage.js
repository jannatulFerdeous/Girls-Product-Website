import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ProductDisplay } from '../../components/product/ProductDisplay';
import { Breadcrumb } from '../../components/product/Breadcrumb';
import { ShopContext } from '../../context/ShopContext';
import './ProductPage.css';

export const ProductPage = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((item) => item.id === Number(productId));

  return (
    <div className='product'>
        <Breadcrumb product={product} />
        {product ? <ProductDisplay product={product} /> : null}
    </div>
  );
};
