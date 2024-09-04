import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import axios from "axios";
import RecentProducts from "../RecentProducts/RecentProducts";
import { Helmet } from "react-helmet";

export default function Products() {
  let [products, setProducts] = useState([]);
  useEffect(() => {}, []);

  return (
    <>
    
      <Helmet>
        <meta charSet="utf-8" />
        <title>products</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="m-2 mt-32">
        <h1 className="text-center text-white text-4xl pb-4  underline underline-offset-4 decoration-black ">
          PRODUCTS
        </h1>

        <RecentProducts />
      </div>
    </>
  );
}
