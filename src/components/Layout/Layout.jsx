import React, { useEffect, useState } from 'react'
import styles from './Layout.module.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
export default function Layout() {
    let [count,setCount]=useState(0)
    useEffect(()=>{},[])
  return (
    <div  className='m-20'>
      <NavBar/>
       <Outlet/>
      <Footer/>
    </div>
  )
}
