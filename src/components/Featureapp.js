import React from "react";
import Slider from "react-slick";
function Featureapp() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    arrows: false, // Disable default arrows
    slidesToShow: 3,
    slidesToScroll: 3,
    // dotsClass: "custom-dots", // Custom class for dots
    autoplaySpeed: 900,
    autoplay: true,
    responsive: [
        {
          breakpoint: 1500,
          settings: {
          slidesToShow: 4, // 3 slides for medium screens
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3, // 3 slides for medium screens
          },
        },
        {
          breakpoint: 2000,
          settings: {
            slidesToShow: 4, // 3 slides for medium screens
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2, // 2 slides for small screens
            arrows: false, // Disable default arrow
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1, // 1 slide for mobile screens
            arrows: false, // Disable default arrow
          },
        },
      ],
  };
  return (
    <>
    <div className="fcontainer">
       <div className="sliddata">
          <h1>Discover the Exciting Features of the <span> Urdu Bolo </span> Streaming App</h1>
          <p>Urdu Bolo offers seamless streaming of your favorite Turkish dramas, all in one place. Enjoy an intuitive interface and personalized recommendations tailored just for you.</p>
       </div>
    <div className="feature-container">
      <Slider {...settings}>

            <div>
             <img src="Images/1.jpeg" alt="can't load"></img>
            </div>
            <div>
             <img src="Images/2.jpeg" alt="can't load"></img>
            </div>
            <div>
             <img src="Images/3.jpeg" alt="can't load"></img>
            </div>
            <div>
             <img src="Images/10.jpeg" alt="can't load"></img>
            </div>
            <div>
             <img src="Images/4.jpeg" alt="can't load"></img>
            </div>
            <div>
             <img src="Images/5.jpeg" alt="can't load"></img>
            </div>
            <div>
             <img src="Images/6.jpeg" alt="can't load"></img>
            </div>
            <div>
             <img src="Images/7.jpeg" alt="can't load"></img>
            </div>
            <div>
             <img src="Images/8.png" alt="can't load"></img>
            </div>
            <div>
             <img src="Images/9.jpeg" alt="can't load"></img>
            </div>
      </Slider>
    </div></div></>
  );
}

export default Featureapp;
