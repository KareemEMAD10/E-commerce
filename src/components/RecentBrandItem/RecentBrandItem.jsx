import React, { useEffect, useState } from 'react'
import styles from './RecentBrandItem.module.css';
import BrandItem from '../BrandItem/BrandItem';
import axios from 'axios';
export default function RecentBrandItem() {
  let [brand,setBrand] = useState([]);
    useEffect(()=>{getBrand()},[]);

    function getBrand() {
      axios
        .get("https://ecommerce.routemisr.com/api/v1/brands")
        .then(({data}) => {
          console.log(data);
          setBrand(data.data);
        })
        .catch((err) => console.log(err));
    }

    

  return (
    <>
      <div className="row grid grid-cols-2  grid-rows xl:grid-cols-5  lg:grid-cols-4 sm:grid-cols-3">
        {brand.map(brand => 
          <BrandItem key={brand._id}    brand={brand}/> 
        )}
      </div>
    </>
  )
}
