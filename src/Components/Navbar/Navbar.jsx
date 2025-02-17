import React, { useContext } from 'react'
import style from "./Navbar.module.css"
import logo from '../../assets/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Products from './../Products/Products';
import Categories from './../Categories/Categories';
import Brands from './../Brands/Brands';
import Register from './../Register/Register';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import Wishlist from './../WishList/WishList';
export default function Navbar() {
  let {userLogin,setUserLogin} =useContext(UserContext)
  let navigate =useNavigate()
  let {numberItems} =useContext(CartContext)
  function Signout(){
    localStorage.removeItem("userToken");
    setUserLogin(null);
   navigate("/login")
  }
    return <>
<nav className="bg-slate-300 border-gray-200 fixed top-0 left-0 right-0">
    <div className="flex flex-wrap justify-center gap-3 lg:justify-between items-center mx-auto max-w-screen-xl p-4">
       <div className='flex items-center gap-5'> <Link
         to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} width={"140px"} className="h-8" alt="Flowbite Logo" />
        </Link>
        {userLogin !=null ? <>
          <ul className='flex gap-3'>
          <li> <Link to='' className='text-slate-600'> Home </Link></li>
          <li> <Link to='cart' className='text-slate-600 relative'>Cart <div className='absolute top-[-13px] right-[-13px] size-5 bg-emerald-700 text-white rounded-full flex items-center justify-center '>
          {numberItems}
            
            </div></Link></li>
          <li> <Link to='products'className='text-slate-600'>Products</Link></li>
          <li> <Link to='wishlist'className='text-slate-600'>Wishlist</Link></li>
          <li> <Link to='categories'className='text-slate-600'>Categories</Link></li>
          <li> <Link to='brands'className='text-slate-600'>Brands</Link></li>
        </ul>
        </>: null }
        </div>




        <div className="flex items-center space-x-6 rtl:space-x-reverse">
        <ul className='flex gap-4'> 
          <li> <i className='fab fa-facebook'></i></li>
          <li> <i className='fab fa-youtube'></i></li>
          <li> <i className='fab fa-instagram'></i></li>
          <li> <i className='fab fa-linkedin'></i></li>
          <li> <i className='fab fa-twitter'></i></li>
        </ul>
        <div className='flex gap-4'>
          {userLogin !=null ?  <li><span onClick={Signout} className='cursor-pointer'>Signout</span></li> :  <>
        
         <li><Link to='login'>Login</Link></li>
          <li><Link to='Register'>Register</Link></li>
          </>}
        </div>
        </div>
    </div>
</nav>
  </>
}
