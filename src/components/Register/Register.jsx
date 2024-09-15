import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Register() {
  let [apiError, setApiError] = useState(null);
  let [isLoading,setIsLoding]=useState(false);
  let navigate=useNavigate()
  useEffect(() => {}, []);

  function register(formValue) {
    
       setApiError(null)
       setIsLoding(true)
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formValue)
      .then((res) => {
        let{data}=res;
        console.log(data.message,'data.message')
        navigate('/signin')
        if (data.message=="success") {
          
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message)
        setIsLoding(false)
      })
  }

  const validationSchema = () => {
    return Yup.object({
      name: Yup.string()
        .min(3, "min characters 3 characters")
        .max(15, "Must be 15 characters or less")
        .required("required"),
      email: Yup.string().email("Invalid email address").required("required"),
      password: Yup.string()
        .matches(/^[A-Z][a-z0-9]{3,8}$/, "password")
        .required("reguired"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "repassord not equl password")
        .required("reguired"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "phone no egypt")
        .required("reguired"),
    });
  };
  let myForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
    <Helmet>
          <meta charSet="utf-8" />
          <title>register</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      {apiError && (
        <div
          className=" max-w-xl mx-auto md:w-full p-4 mb-4 text-sm pt-7 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{apiError}</span>
        </div>
      )}
      <form
        onSubmit={myForm.handleSubmit}
        className=" max-w-xl mx-auto md:w-full bg-slate-50 p-2 mt-32 rounded-xl items-center justify-center  "
      >
        <div className="mb-5 md:w-full">
          <h1 className="text-2xl font-bold pb-4">Register Now : </h1>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name:
          </label>
          <input
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.name}
            type="text"
            id="name"
            className="pb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="name"
          />
          {myForm.errors.email && myForm.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{myForm.errors.name}</span>
            </div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email:
          </label>
          <input
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.email}
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="email"
          />
          {myForm.errors.email && myForm.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{myForm.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password:
          </label>
          <input
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.password}
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="password"
          />
          {myForm.errors.password && myForm.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{myForm.errors.password}</span>
            </div>
          ) : null}
        </div>
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Repeat password:
          </label>
          <input
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.rePassword}
            type="password"
            id="rePassword"
            className="pb-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="rePassword"
          />
          {myForm.errors.rePassword && myForm.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{myForm.errors.rePassword}</span>
            </div>
          ) : null}
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Phone:
          </label>
          <input
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.phone}
            type="tel"
            id="phone"
            className="pb-3 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="phone"
          />
          {myForm.errors.phone && myForm.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{myForm.errors.phone}</span>
            </div>
          ) : null}
        </div>

        <button
        disabled={isLoading}
          type="submit"
          className="text-white bg-green-600 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-30 p-6"
        >
           {isLoading? <i className="fa fa-spinner fa-spin"></i>:'Register'}
        </button>
      </form>
    </>
  );
}
