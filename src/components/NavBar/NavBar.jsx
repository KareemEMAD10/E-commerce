import React, { useContext, useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { UserTokenContext } from "../../Context/UserTokenContext";

import { CartContext } from "./../../Context/CartContext";
("use client");

import { Dropdown } from "flowbite-react";

export default function NavBar() {
  let [count, setCount] = useState(0);
  let { token, setToken } = useContext(UserTokenContext);
  let { cartItemsNum } = useContext(CartContext);
  let navigate = useNavigate();
  // console.log(token, "hello from nav bar");

  useEffect(() => {}, []);

  function LogOut() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/signin");
  }
  return (
    <>
      <nav className="mb-2 bg-slate-300 shadow top-0 right-0 left-0 fixed w-full p-2 justify-between items-center z-20">
        <div className="relative  mx-auto flex max-w-full flex-col py-4 lg:flex-row lg:items-center lg:justify-between justify-between ">
          <NavLink
            className="flex items-center text-4xl font-black pr-96 "
            to="/"
          >
            <span className=" text-7xl text-blue-600 fixed ">
              <img src={logo} alt="icon fresh cart" />
            </span>
          </NavLink>
          <input className="peer hidden text-center " type="checkbox" id="navbar-open" />
          <label
            className="absolute right-0  cursor-pointer text-xl lg:hidden pr-6 text-center justify-between  "
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.88em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            className="peer-checked:block hidden  py-6 lg:block lg:py-0 w-full "
          >
            <div className="flex flex-row justify-between items-center  pr-6">
              {token ? (
                <ul className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4  items-center  pr-8 ">
                  <li>
                    <NavLink
                      to="home"
                      className="text-black hover:text-blue-600 font-mono font-bold"
                    >
                      HOME
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="products"
                      className="text-black hover:text-blue-600 font-mono font-bold"
                    >
                      PRODUCTS
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="cart"
                      className="text-black hover:text-blue-600 font-mono font-bold"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="categories"
                      className="text-black hover:text-blue-600 font-mono font-bold"
                    >
                      CATEGORIES
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="brand"
                      className="text-black hover:text-blue-600 font-mono font-bold"
                    >
                      BRAND
                    </NavLink>
                  </li>
                </ul>
              ) : null}

              <ul className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4  items-center ">
               {token ? <><NavLink to='cart'> 
                <li className=" relative">
                  <div
                    className={
                      cartItemsNum <= 9
                        ? "text-white absolute p-1 pl-4 pb-2 text-sm"
                        : "text-white absolute p-1 pl-3 pb-2 text-sm"
                    }
                  >
                    {cartItemsNum}
                  </div>
                  <i className="fa-solid fa-cart-shopping text-green-800 text-3xl"></i>
                </li>
                </NavLink></> :null}
              </ul>
              <ul className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4  items-center  pr-8">

              <Dropdown label="Social media" dismissOnClick={false}  className="text-black border-2 border-green-300">
                  <Dropdown.Item className="bg-gray-500 hover:bg-slate-500 ">
                    <ul className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-8  items-center ">
                      <li>
                        <i className="fa-brands fa-tiktok text-gray-700"></i>
                      </li>
                      <li>
                        <i className="fa-brands fa-linkedin text-blue-600 "></i>
                      </li>
                      <li>
                        <i className="fa-brands fa-youtube text-red-600"></i>
                      </li>
                      <li>
                        <i className="fa-brands fa-facebook text-blue-700"></i>
                      </li>
                      <li>
                        <i className="fa-brands fa-instagram text-red-700"></i>
                      </li>
                      <li>
                        <i className="fa-brands fa-x text-black"></i>
                      </li>
                    </ul>
                  </Dropdown.Item>
                </Dropdown>
              {token ? (
                  <li className="mt-2 sm:mt-0">
                    <button
                      onClick={LogOut}
                      className=" font-medium text-blue-800 hover:text-red-800"
                      to="signout"
                    >
                      Signout
                    </button>
                  </li>
                ) : (
                  <>
                    <li className="mt-2 sm:mt-0">
                      <NavLink
                        to=""
                        className=" font-medium text-blue-800 hover:text-cyan-600"
                      >
                        register
                      </NavLink>
                    </li>

                    <li className="mt-2 sm:mt-0">
                      <NavLink
                        to="signin"
                        className=" font-medium text-blue-800 hover:text-cyan-600"
                      >
                        Login{" "}
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </nav>
    </>
  );
}
