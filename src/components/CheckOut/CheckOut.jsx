import React, { useContext, useEffect, useState } from "react";
import styles from "./CheckOut.module.css";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function CheckOut() {
  let [isOnlinePayment, setIsOnlinePayment] = useState(false);
  let { cashOnDelivery } = useContext(CartContext);
  let navicate = useNavigate();
  let { cartId } = useParams();
  async function pay() {
    console.log(myForm.values);
    let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
    if (isOnlinePayment) {
      url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`;
    }

    let order = await cashOnDelivery(url, myForm.values);
    if (order.data.status == "success") {
      console.log(order);

      if (isOnlinePayment) {
        window, (location.href = order.data.session.url);
      } else {
        navicate("/allorders");
      }
    } else {
      console.log("error", order);
    }
  }
  let myForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: pay,
  });
  useEffect(() => {}, []);
  return (
    <>
      <form onSubmit={myForm.handleSubmit}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>check out</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div className="w-[50%] mx-auto pt-8">
          <h1></h1>
          <div className="pb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your details:
            </label>
            <input
              onChange={myForm.handleChange}
              value={myForm.values.details}
              type="text"
              id="details"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              name="details"
            />
          </div>

          <div className="pb-4">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your phone:
            </label>
            <input
              onChange={myForm.handleChange}
              value={myForm.values.phone}
              type="tel"
              id="phone"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              name="phone"
            />
          </div>

          <div className="pb-4">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your city:
            </label>
            <input
              onChange={myForm.handleChange}
              value={myForm.values.city}
              type="text"
              id="city"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              name="city"
            />
          </div>
          <input
            type="checkbox"
            id="forOnline"
            onChange={() => setIsOnlinePayment(!isOnlinePayment)}
          />
          <label htmlFor="forOnline" className="pl-2">
            Pay Online
          </label>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-30 p-6 mt-4"
          >
            {isOnlinePayment ? "Pay Online" : "COD"}
          </button>
        </div>
      </form>
    </>
  );
}
