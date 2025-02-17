import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';
import Register from './Components/Register/Register';
import CounterContextprovider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import BrandsDetails from './Components/BrandsDetails/BrandsDetails';
import Wishlist from './Components/WishList/WishList';
import WishlistContextProvider from './Context/WishlistContext';
 let query = new QueryClient()
let x = createBrowserRouter([{
  path:"",element:<Layout/>,
  children: [
    { path: "/", element: <ProtectedRoute> <Home /> </ProtectedRoute>},
    { path: "/products", element: <ProtectedRoute><Products /> </ProtectedRoute>},
    { path: "/cart", element:<ProtectedRoute><Cart /> </ProtectedRoute>},
    { path: "/brands", element: <ProtectedRoute> <Brands /></ProtectedRoute> },
    { path: "/categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute>},
    { path: "productdetails/:id/:category", element: <ProtectedRoute> <ProductDetails/></ProtectedRoute> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/allorders", element: <AllOrders /> },
    { path: "/brandsdetails", element: <BrandsDetails /> },
    { path: "/wishlist", element: <Wishlist /> },
    { path: "*", element: <Notfound /> }
  ]
  
}, ]);
function App() {
  
  return(
    <>
    {/* <Home/> */}
    <UserContextProvider> 
      <CounterContextprovider> 
        <QueryClientProvider client={query}>
          <CartContextProvider >
            <WishlistContextProvider><RouterProvider router={x}></RouterProvider></WishlistContextProvider>
              </CartContextProvider>
              <ReactQueryDevtools />
              </QueryClientProvider>
              </CounterContextprovider> 
              </UserContextProvider>
              <Toaster/>
              {/* adddde */}
    </>
  );
}

export default App
