import React, { useEffect, useState } from 'react'
import { useShop } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

function LatestCollection() {
    const{products}=useShop();
    console.log(products);
    
    const [latestProducts,setLatestProducts]=useState([]);

    useEffect(function(){
        setLatestProducts(products.slice(0,10));
    },[])
    
    return (
        <div className='my-10'>
           <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
           </div>
           <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 text-center'>
           Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the.
           </p>

           {/* Rendering Products */}

           <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap=y=6'>

            {latestProducts.map((product,index)=>{
                return <ProductItem name={product.name} key={index} image={product.image} price={product.price} id={product._id}/>
            })}

           </div>
        </div>


    )
}

export default LatestCollection
