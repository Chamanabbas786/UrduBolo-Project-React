import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const CustomPrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      zIndex: 10,
      fontSize: "30px",
      top: "130px",
      color: "white",
      cursor: "pointer",
      borderRadius: "50%",
    }}
  >
    <i className="fa-solid fa-square-caret-left" id="btns"></i>
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      right: "-5px",
      top: "130px",
      color: "white",
      zIndex: 10,
      fontSize: "30px",
      cursor: "pointer",
      borderRadius: "50%",
    }}
  >
    <i className="fa-solid fa-square-caret-right" id="btns"></i>
  </div>
);

function Dramas() {
  const [data, setdata] = useState([]);
     useEffect(()=>{
 
         fetch('https://codecarehub.space/video_adminpenal/get_dramas.php')
         .then(response=>response.json())
         .then(data => setdata(data))
         .catch(error=> console.error("Error in: " + error))
     },[]);
 
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplaySpeed: 1000,
    autoplay: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: { slidesToShow: 5, centerPadding: "50px" },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, centerPadding: "40px" },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 3, centerPadding: "20px", arrows: false },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: "10px", arrows: false },
      },
    ],
  };

  return (
    <div className="container2">
      <div className="slider-container">
        <h1>Dramas! to Watch</h1>
        <div className="slides">
            {data.map(item => (
              <div key={item.id}>
                 <Link to={`/season`}>
                <img
                    // /${item.id}  src={season.thumbnail ? `https://codecarehub.space/${season.thumbnail}` : "/Images/img2.webp"}
                    // src={'https://codecarehub.space/uploads/-Hudutsuz Sevda y.jpg'}
                    src={'https://codecarehub.space/video_adminpenal/uploads/Screenshot%202024-08-03%20at%2015-03-27%20Pin%20page.png '}
                    alt="img cant load"
                  />
                  <p>{item.name}</p>
                  </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dramas;
