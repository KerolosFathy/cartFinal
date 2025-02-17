import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';

export default function Wishlist() {
  let { getWishlist, deleteWishlist } = useContext(WishlistContext);
  const [Wish, setWish] = useState([]);

  async function getWishlistItem() {
    try {
      let response = await getWishlist();
      if (response.data.status === 'success') {
        setWish(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  async function deleteWish(productId) {
    if (!productId) {
      console.error(" Error: Missing product ID");
      return;
    }

    console.log("Deleting product ID:", productId);

    try {
      let response = await deleteWishlist(productId);
      console.log("Delete API response:", response);

      if (response?.data?.status === 'success') {
        setWish((prevWish) => prevWish.filter(item => item.id !== productId));
        toast.success("Product removed successfully");
      }
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
      toast.error("Failed to remove product");
    }
  }

  useEffect(() => {
    getWishlistItem();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {Wish.length > 0 ? (
              Wish.map((product) => (
                <tr key={product._id || product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.title}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">${product.price}</td>
                  <td className="px-6 py-4">
                    <span onClick={() => deleteWish(product._id || product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">
                      Remove
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">Your wishlist is empty</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
