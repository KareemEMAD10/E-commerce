import React, { useEffect, useState } from 'react'
import styles from './RecentCategoroies.module.css';
import Slider from 'react-slick';
import axios from 'axios';
export default function RecentCategoroies() {
  let [recentCategories, setRecentCategories] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => setRecentCategories(data.data))
      .catch((err) => console.log(err));
  }

  return (
    <>
    <Slider {...settings}>
      
        
          {recentCategories.map((category, i) => (
            <div key={i}className='py-2 ' >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[200px]  "
              />
              <h2 className="p-3 text-white" >{category.name}</h2>
            </div>
          ))}
        
      
      </Slider>
    </>
  );


}
