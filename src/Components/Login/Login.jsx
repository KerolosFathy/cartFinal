import React, { useContext, useState } from 'react';
import style from "./Login.module.css";
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
export default function Login() {
  let {userLogin,setUserLogin}= useContext(UserContext)
  let navigate= useNavigate();
  const [ApiError,setApiError] =useState("");
  const [Isloading,setIsloading] =useState(false);
    function handlelogin(values){
      setIsloading (true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .then((res)=>{
      setIsloading (false)
      if(res.data.message=="success"){
       localStorage.setItem("userToken",res.data.token)
       setUserLogin(res.data.token)
        navigate("/")
      }
    })
    .catch((res)=>{
      setIsloading (false)
      setApiError(res.response.data.message)
      ;
    })
  }
    let validationSchema = yup.object().shape({
      email : yup.string().email("not valid").required("email is required"),
      password : yup.string().min(6,"password is too short").required("password is required"),
    }
  );
  let formik =useFormik({
    initialValues :{
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit: handlelogin,
  })
  return <>
    {ApiError ? <div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3'>
        {ApiError}
      </div> :  null }
      <div className='text-emerald-600 font-bold mx-auto text-3xl text-center	'>Login now</div>
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
      {formik.errors.email && formik.touched.email ?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <span className="font-medium">{formik.errors.email}</span> 
</div> : null }
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password</label>
      {formik.errors.password && formik.touched.password ?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
  <span className="font-medium">{formik.errors.password}</span> 
</div> : null }
  </div>
  <div className='flex gap-4 items-center '>
  <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
    {Isloading ? <i className='fas fa-spinner fa-spin'></i> :"Login"}
    </button>
    <Link to={"/Register"}><span className='text-blue-700 underline'> dont have an account? Register now</span></Link>
  </div>

  </form>
  </>
}