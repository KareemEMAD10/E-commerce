import React, { useContext, useEffect, useState } from "react";
import styles from "./Orders.module.css";
import { CartContext } from "../../Context/CartContext";
import { UserTokenContext } from "../../Context/UserTokenContext";
import { Accordion } from "flowbite-react";
import { Helmet } from "react-helmet";

export default function Orders() {
  let [orders, setOrders] = useState([]);
  let { userId } = useContext(UserTokenContext);
  let { getOrders } = useContext(CartContext);
  useEffect(() => {
    if (userId) getAllOrders();
  }, [userId]);
  async function getAllOrders() {
    // console.log("userId =>",userId);

    let x = await getOrders(userId);
   
    setOrders(x);
    console.log("x====>", x);
  }
  return (
    <>
    <div className="mt-32 pt-10 bg-white ">
    <Helmet>
          <meta charSet="utf-8" />
          <title>allorders</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <div className="justify-between row px-2 items-center">
         <h1 className="text-2xl font-black pb-2">ORDERS</h1>
         <div className="items-center">
         <div> is Paid <i className="fa-solid fa-circle text-green-600"></i></div>
         <div>no Paid <i className="fa-solid fa-circle text-black"></i></div>
         </div>
      </div>
    
      <Accordion className="bg-white ">
     
        {orders?.data?.map(order=> <Accordion.Panel>
        <Accordion.Title className={order.isPaid?'bg-green-600 text-white my-2 hover:bg-gray-400 hover:text-black':'bg-black text-white my-2  hover:bg-gray-400 hover:text-black'}>{order.paymentMethodType}{" --- "}{order.isDelivered.toString()}</Accordion.Title>
        <Accordion.Content className="bg-white">
          <p className="mb-2 text-black dark:text-black">
            {order?.data?.cartItems.count}{'----'}{order?.data?.cartItems.price}
          </p>
          
        </Accordion.Content>
      </Accordion.Panel>)}
        
      </Accordion>
      </div>
    </>
  );
}
