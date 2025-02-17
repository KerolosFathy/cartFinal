import React from 'react'
import style from "./Layout.module.css"
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
export default function Layout() {
  return <>
   <Navbar/>
    <div className="container my-5 w-[100%] py-20 lg:py-5">
      <Outlet /> 
    </div>
    <Footer/>
  </>
}
