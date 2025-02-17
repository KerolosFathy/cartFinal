import React, { createContext, useState } from 'react';
import axios from 'axios';

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addProductoWishlist(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers })
      .then((res) => res)
      .catch((error) => console.error("Add to wishlist error:", error));
  }

  function getWishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => res)
      .catch((error) => console.error("Get wishlist error:", error));
  }

  function deleteWishlist(productId) {
    if (!productId) {
      console.error(" Error: Missing product ID in deleteWishlist");
      return Promise.reject("Product ID is undefined");
    }
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
      .then((res) => res)
      .catch((error) => console.error("Delete wishlist error:", error));
  }

  return (
    <WishlistContext.Provider value={{ addProductoWishlist, getWishlist, deleteWishlist }}>
      {props.children}
    </WishlistContext.Provider>
  );
}
