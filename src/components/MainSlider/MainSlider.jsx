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
      <div className="row ">
        <div className="md:w-3/4 w-full ">
          <Slider {...settings}>
            <img src={Slider1} alt="photo1" className="h-[200px] md:h-[500px]" />
            <img src={Slider2} alt="photo2" className="h-[200px] md:h-[500px]"  />
            <img src={Slider3} alt="photo3"  className="h-[200px] md:h-[500px]" />
          </Slider>
        </div>
        <div className="md:w-1/4 flex md:flex-col flex-row">
          <img src={Slider2} alt="-----" className="md:h-[250px] h-100 md:full w-1/2 md:w-full"  />
          <img src={Slider3} alt="-----" className="md:h-[250px] h-100 md:full w-1/2 md:w-full" />
        </div>
      </div>
    </>
  );
}
