import React, { useEffect, useState } from "react";
import styles from "./MainSlider.module.css";
import Slider from "react-slick";
import Slider1 from "./../../assets/images/slider-image-1.jpeg";
import Slider2 from "./../../assets/images/slider-image-2.jpeg";
import Slider3 from "./../../assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let [count, setCount] = useState(0);
  useEffect(() => {}, []);

  return (
    <>
      <div className="row">
        <div className="w-3/4">
          <Slider {...settings}>
            <img src={Slider1} alt="photo1" className="h-[500px]" />
            <img src={Slider2} alt="photo2" className="h-[500px]"  />
            <img src={Slider3} alt="photo3"  className="h-[500px]" />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={Slider2} alt="-----" className="h-[250px]"  />
          <img src={Slider3} alt="-----" className="h-[250px]"  />
        </div>
      </div>
    </>
  );
}
