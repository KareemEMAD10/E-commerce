import React, { useEffect, useState } from 'react'
import styles from './Notfound.module.css';
import notfound from './../../assets/images/notfound.jpg'
export default function Notfound() {
    let [count,setCount]=useState(0)
    useEffect(()=>{},[])
  return (
    <>
      <img src={notfound} alt="" className='w-[40%]  m-auto my-40 ' />
    </>
  )
}
