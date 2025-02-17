import React, { useContext, useEffect, useState } from 'react'
import { Link, useAsyncError } from 'react-router-dom';
import useProducts from './../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { WishlistContext } from '../../Context/WishlistContext';
export default function RecentProducts() {
  let {addProductoWishlist}=useContext(WishlistContext)
  async function addToWishlist(id) {
    try {
      let response = await addProductoWishlist(id);
      if (response?.data?.status === 'success') {
        toast.success(response.data.message);
      } else {
        toast.error(response?.data?.message || "Failed to add to wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }
  
  let {data, isError ,error,isFetching,isLoading} = useProducts();
  const [loading,setloading]=useState(false);
  let {addProductToCart,setnumberItems,numberItems} = useContext(CartContext);
 async function addToCart(id){
  setloading(true);
   let response = await addProductToCart(id);
      if (response.data.status=="success"){
          toast.success(response.data.message);
          setnumberItems(numberItems+1)
          setloading(false)
      }
      else{
          toast.error(response.data.message);
          setloading(false)
      }
    
    }
const [products, setProducts] = useState([]);
  function getProducts(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
      setProducts(res.data.data);
          })
    .catch((res)=>{})
  }
  useEffect(()=>{
    getProducts();
  },[])
  return <>

    <div className="row">
    {  data?.data?.data.length > 0 ? data?.data?.data.map((product)=><div key={product.id} className='w-1/6'>
      <div className="product my-2 p-2 ">
      <Link to={`productdetails/${product.id}/${product.category.name}`}>
          <img src={product.imageCover} className='w-full' alt='' />
          <h3 className=' text-emerald-700'>{product.category.name}</h3>
          <h3 className=' mb-3 font-semibold'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
          <div className='flex justify-between p-3 '> 
             <span >{product.price} EGP</span>
              <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
          </div>
          </Link>
          <button onClick={()=>addToCart(product.id)} className='btn '>{
            loading ? <i className='fas fa-spinner fa-spin'></i>
           :"Add to cart" }

          </button>
          <button onClick={()=>addToWishlist(product.id)} className="btn bg-red-600 text-white hover:bg-red-700 transition w-full mt-4 py-2 rounded-md">
  {loading ? <i className="fas fa-spinner fa-spin"></i> : "Add to Wishlist"}
</button>

      </div>
  </div>) : <div className="spinner"></div>}
    </div> 
  </>
}

