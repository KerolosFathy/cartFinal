
import React, { useContext, useEffect, useState } from 'react'
import { Link, useAsyncError } from 'react-router-dom';
import useProducts from './../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
export default function Brands() {
  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {data, isError ,error,isFetching,isLoading} = useQuery({
    queryKey : ["brands"],
    queryFn : getBrands ,
    staleTime: 10000,
    //refetchInterval :2000,
    //refetchIntervalInBackground :true,
    //refetchOnWindowFocus : true ,
    });
    const [loading,setloading]=useState(false);
    let {addProductToCart} = useContext(CartContext);
    async function addToCart(id){
     setloading(true);
      let response = await addProductToCart(id);
         if (response.data.status=="success"){
             toast.success(response.data.message);
             setloading(false)
         }
         else{
             toast.error(response.data.message);
             setloading(false)
         }
       
       }
  return <>
 <div className="container mx-auto px-4">
  <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
    Shop by Brand
  </h2>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {data?.data?.data.length > 0 ? (
      data?.data?.data.map((brand) => (
        <div key={brand._id} className="w-full">
          <div className="brand-item bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105">
            <Link to={`/brand/${brand._id}`}>
              <img
                src={brand.image}
                alt={brand.name}
                className="w-32 h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-700">{brand.name}</h3>
            </Link>
          </div>
        </div>
      ))
    ) : (
      <div className="spinner"></div>
    )}
  </div>
</div>

  </>
}
