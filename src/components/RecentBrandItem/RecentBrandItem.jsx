import React, { useEffect, useState } from 'react';
import styles from './RecentBrandItem.module.css';
import BrandItem from '../BrandItem/BrandItem';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa'; 

export default function RecentBrandItem() {
  let [brand, setBrand] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getBrand();
  }, []);
   //-----------getBrand-----------//
  function getBrand() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then(({ data }) => {
        console.log(data);
        setBrand(data.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <>
      {loading ? (
        
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-green-300" /> 
          
        </div>
      ) : (
       
        <div className="row grid grid-cols-1 grid-rows xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2">
          {brand.map((brand) => (
            <BrandItem key={brand._id} brand={brand} />
          ))}
        </div>
      )}
    </>
  );
}
