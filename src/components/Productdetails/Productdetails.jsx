import React, { useContext, useEffect, useState } from "react";
import styles from "./Productdetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loder from "../Loder/Loder";
import ProductItem from "../ProductItem/ProductItem";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";

import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
export default function Productdetails(addCart,loding) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let { id, categoryId } = useParams();

  let [Productdetails, setProductDetails] = useState();
  let [relatedProduct, setRelatedProduct] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  let { addProductToCart, cartItemsNum, setCartItemsNum } =
    useContext(CartContext);
  console.log(categoryId);

  useEffect(() => {
    getProductDetails();
    getRelatedProducts();
  }, []);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  //-------ChangeState----------//

  function ChangeState(id) {
    setItems([]);

    setTimeout(() => {
      items[id] = true;
      setItems(items);
    });
  }

  //---------------getProductDetails-----------------//

  function getProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setIsLoding(false);
        setProductDetails(data.data);
        if (relatedProduct.length) {
          getFilterData(relatedProduct);
        }
      })
      .catch(({ err }) => console.log(err));
  }

  //----------------getRelatedProducts---------------//

  function getRelatedProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        getFilterData(data, data);
      })
      .catch(({ err }) => console.log(err));
  }

  function getFilterData({ data }) {
    let res = data.filter(
      (ele) => ele.category._id == categoryId && ele.id != id
    );
    setRelatedProduct(res);
  }

  //---------------  add cart -------------------//

  async function addCart(id) {
    console.log("hiiiiiii", id);
    setIsLoading(true)

    let { data } = await addProductToCart(id);
    console.log(data, "hdghdfghsfh");

    if (data.status == "success") {
      let newcartItemsNum = cartItemsNum + 1;
      setCartItemsNum(newcartItemsNum);
    }
    if (data.status == "success") {
      toast.success("Successfully , The item has been added");
      setIsLoading(false)
    } else {
      toast.error("This is an error!");
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="items-center justify-between p-6 ">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{Productdetails?.title}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        
          
            <div className=" flex flex-col md:flex md:flex-row items-center justify-between  ">
              <div className="w-full  md:w-1/3 py-4  pr-6">
                <Slider {...settings}>
                  {Productdetails?.images.map((src) => (
                    <img src={src} className="w-full " />
                  ))}
                </Slider>
              </div>
              <div className="w-full md:w-2/3 py-4 pl-3">
                <h2 className="text-4xl font-bold mb-4">
                  {Productdetails?.title}
                </h2>
                <p className="mb-4 text-gray-400 font-light">
                  {Productdetails?.description}
                </p>
                <span className="mb-4  text-sky-800 font-mono text-xl">
                  {Productdetails?.category.name}
                </span>
                <div className="flex justify-between">
                  <span>{Productdetails?.price}EGP</span>
                  <span>
                    {Productdetails?.ratingsAverage}
                    <i className="fa fa-solid fa-star text-yellow-300"></i>
                  </span>
                </div>
                <div className="p-2 ">
                  <button
                    className="btn rounded-xl "
                    onClick={() => {
                      addCart(Productdetails?.id);
                      ChangeState(id);
                    }}
                  >
                    {isLoading && items[Productdetails.id] ? (
                      <i className="fa fa-spinner fa-spin"></i>
                    ) : (
                      <span>
                        Add To Cart
                        <i className="fa-solid fa-cart-shopping text-white"></i>
                      </span>
                    )}
                  </button>
                </div>
                <h3 className="text-center text-black">
                  --------------------------------------
                </h3>
              </div>
            </div>
            <h2 className="text-xl text-blue-800 font-mono pl-4 pb-4">
              Related Products
            </h2>
            <div className="row grid gap-4  sm:grid-cols-3 sm:grid-rows-3 md:grid-cols-4 md:grid-rows-4   lg:grid-cols-5 lg:grid-rows-5">
              {relatedProduct.map((product) => (
                <ProductItem
                  key={product.id}
                  addCart={addCart}
                  loding={loding}
                  product={product}
                />
              ))}
            </div>
         
      </div>

      
    </>
  );
}
