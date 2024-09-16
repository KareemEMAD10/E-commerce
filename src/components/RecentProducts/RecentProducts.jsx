import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import Loder from '../Loder/Loder';

export default function RecentProducts() {
  let [isLoadingbutton, setIsLoadingbutton] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let { addProductToCart, cartItemsNum, setCartItemsNum } = useContext(CartContext);
  let [products, setProducts] = useState([]);
  let [searchTerm, setSearchTerm] = useState('');
  

  useEffect(() => {
    getProducts();
  }, []);
   //--------getProducts---------//

  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setProducts(data.data);
        setIsLoadingbutton(false);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

      //---------addToCartItem----------//

  async function addToCartItem(id) {
    setIsLoadingbutton(true);
    let newcartItemsNum = cartItemsNum + 1;
    setCartItemsNum(newcartItemsNum);

    //---------addProductToCart---------//

    let { data } = await addProductToCart(id);
    console.log("bl7", data);
    setIsLoadingbutton(false);
    if (data.status === "success") {
      toast.success('Successfully, the item has been added');
    } else {
      toast.error('This is an error!');
    }
  }

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="p-4 ">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
           <span className='text-black text-center pb-4'>-----------------------</span>
        {/* Product List */}
        {isLoading ? (
           <div className="flex justify-center items-center h-64">
           <FaSpinner className="animate-spin text-4xl text-green-300" /> 
           
         </div> // Display a loader while fetching data
        ) : (
          <div className="grid grid-rows xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-2 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductItem
                  key={product.id}
                  addCart={addToCartItem}
                  loding={isLoadingbutton}
                  product={product}
                />
              ))
            ) : (
              <>
              
              <p className="text-center col-span-full">No products found</p>
             
              
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
