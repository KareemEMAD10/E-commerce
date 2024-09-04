import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";

// import axios from "axios";
import RecentProducts from "../RecentProducts/RecentProducts";
import Categories from "../Categories/Categories";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
import RecentCategoroies from "../RecentCategoroies/RecentCategoroies";

// import { CounterContext } from "../../Context/CounterContext";
export default function Home() {
  // let [count, setCount] = useState(0);
  //  let {counter}= useContext(CounterContext)
  //  console.log(counter);
  // let [products, setProducts] = useState([]);
  // useEffect(() => {
  //   getProducts();
  // }, []);
  // function getProducts() {
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/products")
  //     .then((res) => {
  //       console.log(res.data);
  //       setProducts(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }
  useEffect(() => {});
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>  
      <MainSlider />
      <RecentCategoroies />
      <div className="pt-8">
        <RecentProducts />
      </div>
    </>
  );
}
