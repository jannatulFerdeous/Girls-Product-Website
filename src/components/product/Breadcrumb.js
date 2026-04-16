import React from 'react'
import { MdArrowForwardIos } from "react-icons/md";
import './Breadcrumb.css';

export const Breadcrumb = (props) => {
    const {product} = props; 
  return (
    <div className='breadcrum'>
        HOME <MdArrowForwardIos /> SHOP <MdArrowForwardIos/> {product?.name}
    </div>
  )
};
