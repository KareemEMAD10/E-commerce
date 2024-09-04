import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import axios from "axios";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

export default function Categories() {
  let [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => setCategories(data.data))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="mt-40">
        <h1 className="text-center text-white text-4xl pb-4 underline underline-offset-4 ">CATEGORIES</h1>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Categories</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div className="text-center grid gap-4 grid-cols-2 grid-rows-2  lg:grid lg:gap-4 lg:grid-cols-3 lg:grid-rows-3 ">
          {categories.map((category, i) => (
            <div key={i} className="border-2 border-spacing-2 hover:shadow-lg  hover:shadow-lime-400 backdrop-blur-sm bg-white/30 ">
              <img
                src={category.image}
                alt={category.name}
                className=" w-[250%] h-[200px] p-2 "
              />
              <h2 className="p-3 text-white" >{category.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
