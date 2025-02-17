import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";

export default function BrandsDetails() {
  let { id } = useParams();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const getBrand = async () => {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    return response.data.data;
  };

  const { data: brand, isLoading: brandLoading } = useQuery({
    queryKey: ["brandDetails", id],
    queryFn: getBrand,
    staleTime: 10000,
  });


  const getAllProducts = async () => {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    return response.data.data;
  };

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    staleTime: 10000,
  });

 
  const relatedProducts = products?.filter((p) => p.brand?._id === id) || [];

  return (
    <div className="container mx-auto px-4">
      {brandLoading ? (
        <div className="text-center text-lg">Loading brand details...</div>
      ) : (
        <>
         
          <div className="grid grid-cols-12 gap-6 items-start bg-white shadow-md p-6 rounded-lg">
            <div className="col-span-4">
              <Slider {...settings}>
                <img src={brand?.image} className="w-full rounded-md" alt={brand?.name} />
              </Slider>
            </div>
            <div className="col-span-8">
              <h3 className="text-2xl font-semibold">{brand?.name}</h3>
              <p className="text-gray-700">{brand?.description || "No description available."}</p>
            </div>
          </div>

         
          <h2 className="text-2xl font-bold mt-10 mb-4">Products by {brand?.name}</h2>
          <div className="grid grid-cols-6 gap-4">
            {productsLoading ? (
              <div className="text-center text-lg">Loading products...</div>
            ) : relatedProducts.length > 0 ? (
              relatedProducts.map((product) => (
                <div key={product._id} className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition">
                  <Link to={`/productdetails/${product._id}/${product.category?.name}`}>
                    <img src={product.imageCover} className="w-full rounded-md mb-2" alt={product.title} />
                    <h3 className="text-green-700 font-semibold">{product.category?.name}</h3>
                    <h4 className="font-bold text-gray-800">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-semibold text-gray-900">{product.price} EGP</span>
                      <span className="flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-1"></i> {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button className="mt-2 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Add To Cart
                  </button>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center w-full">No products available for this brand.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

