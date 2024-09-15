import React, { useEffect, useState } from 'react'
import styles from './BrandItem.module.css';
export default function BrandItem({brand}) {
    let [count,setCount]=useState(0)
    const[itemsBrand,setItemsBrand]=useState([])
    function ChangeState(_id){
     
      setItemsBrand([])
      
       setTimeout(()=>{
        itemsBrand[_id]=true;
        setItemsBrand(itemsBrand)
        
       })
    }
  return (
    <>
      <div key={brand._id} className="w-full p-2">
        <div className='bg-white p-4 text-center hover:shadow-inner hover:shadow-lime-400   hover:transition-shadow  border-2 border-gray-400 items-center'>
          <img src={brand.image} alt={brand.name}  className=' w-full'/>
          <h2 className='text-center'>{brand.name}</h2>
        </div>
      </div>
       
    </>
  )
}
