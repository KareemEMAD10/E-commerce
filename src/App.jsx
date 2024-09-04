import { lazy, useState } from "react";
import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Brand from "./components/Brand/Brand";
import Signin from "./components/Signin/Signin";
import Signout from "./components/Signout/Signout";
import Notfound from "./components/Notfound/Notfound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CounterContextProvider from "./Context/CounterContext";
import UserTokenContextProvider from "./Context/UserTokenContext";
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProtectedRoutesLogin from "./components/ProtectedRoutesLogin/ProtectedRoutesLogin";
import Productdetails from "./components/Productdetails/Productdetails";
import CartContextProvider, { CartContext } from "./Context/CartContext";
import  { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut';
import Orders from './components/Orders/Orders';
import { useEffect } from "react";
import { useContext } from "react";
import { Offline, Online } from "react-detect-offline";
import Forgit from "./components/ForgitPassword/Forgit";
import ResetCode from "./components/ResetCode/ResetCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";


const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element:<ProtectedRoutesLogin><Register /></ProtectedRoutesLogin>  },
      { path: "home", element:<ProtectedRoutes> <Home /></ProtectedRoutes> },
      { path: "products", element:<ProtectedRoutes><Products /></ProtectedRoutes>  },
      { path: "cart", element:<ProtectedRoutes> <Cart /></ProtectedRoutes> },
      { path: "categories", element:<ProtectedRoutes><Categories /></ProtectedRoutes>  },
      { path: "brand", element:<ProtectedRoutes><Brand /></ProtectedRoutes>  },
      { path: "register", element: <ProtectedRoutesLogin><Register /></ProtectedRoutesLogin> },
      { path: "signin", element: <ProtectedRoutesLogin><Signin /></ProtectedRoutesLogin> },
      { path: "forgit", element: <ProtectedRoutesLogin><Forgit/></ProtectedRoutesLogin> },
      { path: "resetCode", element: <ProtectedRoutesLogin><ResetCode/></ProtectedRoutesLogin> },
      { path: "resetPassword", element: <ProtectedRoutesLogin><ResetPassword/></ProtectedRoutesLogin> },
      { path: "signout", element: <Signout /> },
      {path:"productdetails/:id/:categoryId",element:<ProtectedRoutes><Productdetails/></ProtectedRoutes>},
      {path:"checkout/:cartId",element:<ProtectedRoutes><CheckOut/></ProtectedRoutes>},
      {path:"allorders",element:<ProtectedRoutes><Orders/></ProtectedRoutes>},
      {path:"productdetails/:id",element:<ProtectedRoutes><Productdetails/></ProtectedRoutes>},
      { path: "*", element: <Notfound />  }
     
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);
  
  let{getProductToCart,setCartItemsNum}=useContext(CartContext)
  useEffect(()=>{
    getCartInfo()
  })

  async function getCartInfo() {
    let res = await getProductToCart();
    console.log(res);
      setCartItemsNum(res.data.numOfCartItems);
  }

  return (
    <>
      <UserTokenContextProvider>
        <CounterContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          {/* <Online> <div className="z-40 text-center text-white  bg-green-500 w-1/2 m-auto rounded-xl bottom-0 fixed">Only shown when you're online</div></Online> */}
          <Offline><div className="z-40 text-center text-white  bg-red-500 w-1/2 m-auto rounded-xl bottom-0 fixed ">Only shown offline (surprise!)</div></Offline>
          <Toaster />
        </CounterContextProvider>
      </UserTokenContextProvider>
    </>
  );
}

export default App;
