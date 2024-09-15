import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";

// import axios from "axios";
import RecentProducts from "../RecentProducts/RecentProducts";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
import RecentCategoroies from "../RecentCategoroies/RecentCategoroies";

export default function Home() {

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
