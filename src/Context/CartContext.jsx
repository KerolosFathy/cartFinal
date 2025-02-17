import axios from "axios";
import { createContext, useState,useEffect } from "react";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
    const[cartId,setcartId]=useState( 0)
    const[numberItems,setnumberItems]=useState(0)
    async function addProductToCart(productId) {
        const headers = { token: localStorage.getItem("userToken") };

        return axios
            .post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
            .then((res) => res)
            .catch((err) => err);
    }

    async function updateCart(productId,newCount) {

        const headers = { token: localStorage.getItem("userToken") };

        return axios
            .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count : newCount},{headers})
            .then((res) => res)
            .catch((err) => err);
    }
    async function getLoggedUserCart() {
        const headers = { token: localStorage.getItem("userToken") };

        return axios
            .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => {
                    setcartId(res.data.data._id);
                    setnumberItems(res.data.numOfCartItems);
                return res
            })
            .catch((err) => err);
    }
    async  function deleteProduct(productId){
        const headers = { token: localStorage.getItem("userToken") };
      return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((res) => res)
            .catch((err) => err);
      }
      async  function checkout(cartId,url ,formData){
        const headers = { token: localStorage.getItem("userToken") };
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{shippingAddress :formData },{headers})
        .then((res) => res)
            .catch((err) => err);
      }
      useEffect(()=>{
        getLoggedUserCart()
      },[])
    return (
        <CartContext.Provider value={{ addProductToCart, getLoggedUserCart,updateCart,deleteProduct,checkout,cartId,numberItems,setnumberItems }}>
            {children}
        </CartContext.Provider>
    );
}
