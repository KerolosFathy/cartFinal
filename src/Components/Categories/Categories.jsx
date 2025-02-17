import React, { useContext, useEffect, useState } from 'react'
import { Link, useAsyncError } from 'react-router-dom';
import useProducts from './../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import style from "./Categories.module.css"
export default function Categories() {
  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {data, isError ,error,isFetching,isLoading} = useQuery({
    queryKey : ["categories"],
    queryFn : getCategories ,
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
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.data.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category.slug}`}
            className="category-item bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-32 h-32 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-700">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
    </>
}
