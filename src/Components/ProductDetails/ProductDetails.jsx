import React, { useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Categories from './../Categories/Categories';
import Slider from "react-slick";
export default function ProductDetails() {
  
    const [product,setproduct]= useState(null);
    const [relatedProducts , setrelatedProducts] = useState([])
  let {id ,category} = useParams()
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true, 
    autoplaySpeed : 2000, 
  };
  function getproduct(id){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res)=>{
        console.log(res.data.data);
        
        setproduct(res.data.data)
      })
      .catch((res)=>{})
    }
   function getallproducts(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res)=>{
        let related= res.data.data.filter((product)=> product.category.name == category)
        setrelatedProducts(related)
      })
    }

    useEffect(()=>{
      getproduct(id);
      getallproducts()
    },[id,category]);
  return <>
      <div className="row items-start">
    <div className="w-1/4">
    <Slider {...settings}>
      {product ?.images.map((src)=><img src={src} className='w-full' alt='' />)}
      
    </Slider>
        </div>
    <div className="w-3/4 p-4">
        <h3 className="font-semibold capitalize text-2xl">{product?.title}</h3>
        <div className="flex justify-between p-3">
            <span className="font-bold text-lg">{product?.price} EGP</span>
            <span className="flex items-center">
                <i className="fas fa-star text-yellow-400 mr-1"></i>{product?.ratingsAverage}
            </span>
        </div>
        <h4 className="text-gray-700 my-4">{product?.description}</h4>
        <h4>{product?.category?.name}</h4>
        <button className="btn mt-4">Add To Cart</button>
    </div>
</div>
<div className="row">
    {  relatedProducts.length>0 ? relatedProducts.map((product)=><div key={product.id} className='w-1/6'>
      <div className="product my-2 p-2 ">
      <Link to={`/productdetails/${product.id}/${product.category.name}`}>
          <img src={product.imageCover} className='w-full' alt='' />
          <h3 className=' text-emerald-700'>{product.category.name}</h3>
          <h3 className=' mb-3 font-semibold'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
          <div className='flex justify-between p-3 '> 
             <span >{product.price} EGP</span>
              <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
          </div>
          </Link>
          <button className='btn '>Add To Cart</button>
      </div>
  </div>) : <div className="spinner"></div>}
    </div>
  </> 
}
