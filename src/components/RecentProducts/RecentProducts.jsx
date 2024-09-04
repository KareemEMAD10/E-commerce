import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProducts.module.css';
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Loder from '../Loder/Loder';
export default function RecentProducts() {
  let [isLoding,setIsLoding]=useState(false)
  let{addProductToCart,cartItemsNum,setCartItemsNum}=useContext(CartContext)
  let [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({data}) => {
        // console.log(data.data);
        setProducts(data.data);
        setIsLoding(false)
      })
      .catch((err) => console.log(err));
  }

  async function addToCartItem(id){
    setIsLoding(true)
    let newcartItemsNum=cartItemsNum+1;
    setCartItemsNum(newcartItemsNum)

   let {data} = await addProductToCart(id);
   console.log("bl7",data);
   setIsLoding(false)
   if (data.status == "success"){
    toast.success('Successfully , The item has been added');
   }
   else{
    toast.error('This is an error!');
   }
  }
 

  return (
    <>
    <div className="row grid  grid-rows xl:grid-cols-6  lg:grid-cols-4 sm:grid-cols-2">
        {products.map(product => 
          <ProductItem key={product.id} addCart={addToCartItem} loding={isLoding} product={product}/> 
        )}
      </div>
      
    </>
  )
}
