import React, { useContext, useEffect, useState } from 'react'
import styles from './Layout.module.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

import { Outlet } from 'react-router-dom';
import { UserTokenContext } from '../../Context/UserTokenContext';
export default function Layout() {
  let { token, setToken } = useContext(UserTokenContext);
    let [count,setCount]=useState(0)
    useEffect(()=>{},[])
  return (
    <div  className='m-20'>
      <NavBar/>
       <Outlet/>
     {token ?<Footer/>:null} 
    </div>
  )
}
