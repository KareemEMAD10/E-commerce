import axios from "axios";
import { createContext, useState } from "react";

const headers = {
    token: window.localStorage.getItem("token")
}

export let CartContext=createContext();

function addProductToCart(productId){
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {productId},
        {
            headers
        }
    ).then(res => res)
    .catch(err => err)
}

function getProductToCart(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
       
        {
            headers
        }
    ).then(res => res)
    .catch(err => err)
}

function removeProduct(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{headers})
    .then(res => res)
    .catch(err => err)
  }

  function updateProductCount(id ,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {count} ,{headers})
    .then(res => res)
    .catch(err => err)
  }

  function cashOnDelivery(url,shippingAddress){
    console.log(url,shippingAddress , "gfsfgfgsfgdsgfsdfgfgsgfsd");
    return axios.post(url, {shippingAddress} ,{headers})
    .then(res => res)
    .catch(err => err)
  }



  function getOrders(userId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    .then(res => res)
    .catch(err => err)
  }

  function clearCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,{headers})
    .then(res => res)
    .catch(err => err)
  }

export default function CartContextProvider({children}){
    let [cartId,setCartId]=useState(null)
    let [cartItemsNum,setCartItemsNum]=useState(null)
    return <CartContext.Provider value={{clearCart,cartItemsNum,setCartItemsNum,getOrders,addProductToCart ,getProductToCart ,removeProduct ,updateProductCount ,cashOnDelivery ,cartId,setCartId}}>
       {children}

    </CartContext.Provider>
}
