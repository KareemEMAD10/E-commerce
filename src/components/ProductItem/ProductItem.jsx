import React, { useEffect, useState } from "react";
import styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";
export default function ProductItem({ product, addCart }) {
  // let [currntId, setCurrntId] = useState(null);
  const[items,setItems]=useState([])
  const [isAdding, setIsAdding] = useState(false);

   //------------handleAddToCart--------------//  
  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      await addCart(product.id); 
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };
  //---------------ChangeState---------------------//
  function ChangeState(id){
   
     setItems([])
    
     setTimeout(()=>{
      items[id]=true;
      setItems(items)
      
     })
     
  }
  useEffect(() => {}, []);
  return (
    <>
    
      <div key={product.id} className="w-full p-1  ">
        
        <div className="product  hover:rounded-xl overflow-hidden">
          <Link to={`/productdetails/${product.id}/${product.category._id}` }>
            <img src={product.imageCover} alt="" />
            <div className="p-2">
              <span className="text-green-500">{product.category.name}</span>
              <h2 className="font-bold">
                {product.title.split(" ").splice(0, 2).join(" ")}
              </h2>
              <div className="row justify-between">
                <span>{product.price}EGP</span>
                <span>
                  {product.ratingsAverage}
                  <i className="fa fa-solid fa-star text-yellow-300"></i>
                </span>
              </div>
            </div>
          </Link>
          <div className="p-2 ">
            <button
              className="btn rounded-xl "
              onClick={() => {ChangeState(product.id);handleAddToCart()} }
              disabled={isAdding}
            >
              {isAdding && items[product.id] ? 
                <i className="fa fa-spinner fa-spin"></i>
               : 
                <span>
                  Add To Cart
                  <i className="fa-solid fa-cart-shopping text-white"></i>
                </span>
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
