import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import Loder from "../Loder/Loder";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let {
    setCartItemsNum,getProductToCart,removeProduct,clearCart,updateProductCount,setCartId,cartId} = useContext(CartContext);
  let [cartInfo, setCartInfo] = useState(null);
  let [noCartInfo, setNoCartInfo] = useState("");
  let [isLoding, setIsLoding] = useState(true);
  let Navigate = useNavigate();
  useEffect(() => {
    getCartInfo();
  }, []);
   //---------------getCartInfo-------------//
  async function getCartInfo() {
    let res = await getProductToCart();
    console.log(res, "gggggggggggggg");

    setCartItemsNum(res.data.numOfCartItems);
    console.log("fghfghjjkjjjghghgfhfh", res.data.numOfCartItems);
   
    setCartInfo(res.data);
  

    setCartId(res.data.data._id);
    setTimeout(() => {
      setIsLoding(false);
    }, 10);
  }
 //--------------removeItem--------------//
  async function removeItem(id) {
    let res = await removeProduct(id);
    console.log(res);
    setCartItemsNum(res.data.numOfCartItems);
    console.log(
      "vcvxnbchjgchsdhcjksdhcjhdbsvjhgcudhshjcgi",
      res.data.numOfCartItems
    );
    setCartInfo(res.data);
  }
  //-----------------updateProduct-------------------//
  async function updateProduct(id, count) {
    let res = await updateProductCount(id, count);
    console.log(res);
    setCartInfo(res.data);
  }
   //-----------------clearCartItems---------------//
  async function clearCartItems() {
    let { data } = await clearCart();
    console.log("clear cart", data);

    if ((data.message = "success")) {
      setCartItemsNum(0);
      setNoCartInfo("cart is empty");
      Navigate('/home')
    }
  }
   //---------------goToCheckOut--------------//
  function goToCheckOut() {
    Navigate(`/checkout/${cartId}`);
  }
  

  return (
    <>
      <div className=" w-[70%] mx-auto my-10 relative overflow-x-auto shadow-md sm:rounded-lg ">
        <h1 className=" text-black  text-center  font-bold text-2xl mt-8 mb-4">
          Shopping Cart
        </h1>
        <Helmet>
          <meta charSet="utf-8" />
          <title>cart</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        {isLoding ? (
          <div className="flex w-full  justify-center items-center top-0 right-0 bottom-0 left-0 fixed ">
            <Loder />
          </div>
        ) : (
          <>
            {" "}
            {noCartInfo ? (
              noCartInfo
            ) : (
              <>
                {cartInfo.data?.products.length ? (
                  <div>
                    <div className=" flex justify-between p-8">
                      <h2 className="text-blue-400 text-xl font-mono">
                        Total Cart Item :{cartInfo.numOfCartItems}
                      </h2>
                      <h2 className="text-lime-400 text-xl font-mono">
                        Total Price : {cartInfo?.data?.totalCartPrice}{" "}
                      </h2>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-16 py-3">
                            <span className="sr-only">Image</span>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Product
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Qty
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price / TOTAL PER PRODUCT
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartInfo.data.products
                          .filter((ele) => ele.count != 0)
                          .map((ele) => (
                            <tr
                              key={ele._id}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              <td className="p-4">
                                <img
                                  src={ele.product.imageCover}
                                  className="w-16 md:w-32 max-w-full max-h-full"
                                  alt="Apple Watch"
                                />
                              </td>
                              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {ele.product.title}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <button
                                    onClick={() =>
                                      updateProduct(
                                        ele.product.id,
                                        ele.count - 1
                                      )
                                    }
                                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    type="button"
                                  >
                                    <span className="sr-only">
                                      Quantity button
                                    </span>
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 2"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M1 1h16"
                                      />
                                    </svg>
                                  </button>
                                  <div>
                                    <span className="bg-gray-300 rounded-lg p-2">
                                      {ele.count}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() =>
                                      updateProduct(
                                        ele.product.id,
                                        ele.count + 1
                                      )
                                    }
                                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    type="button"
                                  >
                                    <span className="sr-only">
                                      Quantity button
                                    </span>
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 1v16M1 9h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {ele.price} / {ele.price * ele.count} EGP
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                  onClick={() => removeItem(ele.product.id)}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="justify-between items-center">
                      {noCartInfo ? null : (
                        <button
                          onClick={clearCartItems}
                          className="bg-red-600 text-white rounded-xl hover:bg-red-700 hover:border-red-300 hover:border-2 w-[25%] mt-4 "
                        >
                          
                          Clear
                        </button>
                      )}

                      <button className="btn mt-4" onClick={goToCheckOut}>
                        Continue To CheckOut
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="text-white">"cart is empty, please go to shopping -- " </span>
                )}
              </>
            )}{" "}
          </>
        )}
      </div>
    </>
  );
}
