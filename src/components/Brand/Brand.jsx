import React, { useEffect, useState } from 'react'
import styles from './Brand.module.css';
import { Helmet } from 'react-helmet';
import RecentBrandItem from '../RecentBrandItem/RecentBrandItem';
export default function Brand() {
    let [count,setCount]=useState(0)
    useEffect(()=>{},[])
  return (
    <>
    <div className="m-2 mt-32">
     <h1 className="text-center text-white text-4xl pb-4  underline underline-offset-4 decoration-black ">BRANDS</h1>
      <Helmet>
          <meta charSet="utf-8" />
          <title>brand</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <RecentBrandItem/>
      </div>
    </>
  )
}
