import React, { useEffect, useState } from 'react'
import style from "./CategoriesSlider.module.css"
import axios from 'axios'
import Slider from "react-slick";
export default function CategoriesSlider() {
  const[categories,setcategories] =useState([])
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay : true, 
    autoplaySpeed : 1000, 
  };
   function getcategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
        setcategories(res.data.data);
    })
  }
   useEffect(()=>{
    getcategories();
   },[])
  return <>
        <h2 className='my-3 capitalize font-semibold text-gray-600 text-left'> Shop popular categories</h2>
        <Slider {...settings}>
          {categories.map((category)=> <div>
            <img src={category.image} className='w-full h-[200px] object-cover ' alt=''/>
            <h4>{category.name}</h4>
          </div>)}
        </Slider>
  </>
}
