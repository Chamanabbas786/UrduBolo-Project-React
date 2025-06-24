import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
const CustomPrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      // left: "-40px",
       zIndex: 10,
       fontSize: "30px",
       top: "130px",
      color: "white",
      cursor: "pointer",
      borderRadius: "50%", // Make the corners fully rounded
    }}
  >
    <i class="fa-solid fa-square-caret-left"id="btns"></i>
  </div>
);

// Custom Next Arrow
const CustomNextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      right: "-5px",
      top: "130px",
      color: "white",
      fontSize: "30px",
      cursor: "pointer",
      borderRadius: "50%", // Make the corners fully rounded
    }}
  >
    <i class="fa-solid fa-square-caret-right" id="btns"></i>
    
  </div>
);

function Popularmovies() {
    const [data, setdata] = useState([]);
        useEffect(()=>{
    
            fetch('https://codecarehub.space/video_adminpenal/get_dramas.php')
            .then(response=>response.json())
            .then(data => setdata(data))
            .catch(error=> console.error("Error in: " + error))
        },[]);
    
  const settings = {
    dots: false, // Disable dots for a clean slider appearance
    infinite: true,
    speed: 500,
    autoplaySpeed: 1000,
    autoplay: true,
    slidesToShow: 6, // Show 5 slides at once
    slidesToScroll: 1,
    //  centerMode: true, // Enable center mode for a more spaced-out look
    centerPadding: "50px", // Space between the centered slide and others
    prevArrow: <CustomPrevArrow />, // Use custom previous arrow
    nextArrow: <CustomNextArrow /> , // Use custom next arrow
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5, // 3 slides for medium screens
          centerPadding: "50px", // Adjust padding for medium screens
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4, // 3 slides for medium screens
          centerPadding: "40px", // Adjust padding for medium screens
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 6, // 3 slides for medium screens
          centerPadding: "50px", // Adjust padding for medium screens
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3, // 2 slides for small screens
          centerPadding: "20px", // Adjust padding for small screens
          arrows: false, // Disable default arrow
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // 1 slide for mobile screens
          centerPadding: "10px", // Adjust padding for mobile screens
          arrows: false, // Disable default arrow
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1, // 1 slide for mobile screens
          centerPadding: "10px", // Adjust padding for mobile screens
          arrows: false, // Disable default arrow
        },
      },
    ],
  };
  return (
     <>
     <body>
    <div className="container2">
    <div className="slider-container">
      <div className="headerdata">
      <h1>Turkish Dramas</h1><Link to={'/watchall'}>View All</Link></div>
      <div className="pslides">
        <Slider {...settings} >
          {data.map(item => (
                <div key={item.id} className="pmovies-box2">
                    <Link to={`/season/${item.name}/${item.id}`}>
                    <img
                       src={
                              item.thumbnail
                                ? `https://codecarehub.space/video_adminpenal/${encodeURIComponent(item.thumbnail)}`
                                    : "/Images/img2.webp"
                             }
                                alt="img cant load"
                    />
                            <div className="overlay">
                               <div className="imgicons">
                               <i class="fa-solid fa-square-share-nodes"></i>
                               <i class="fa-brands fa-gratipay"></i>
                               <i class="fa-solid fa-circle-play" id="play-video-seasons"></i>
                               </div>
                               <div className="imgtitle">
                               <p>{item.name}</p>
                               </div></div>
                            </Link>
                        </div>
                      ))}
          {/* <div className="pmovies-box1">
            <a href="links1">
            
            
            
            </a>
          </div>
          <div >
             <a href="links2">
             <img src="/Images/img2.webp"></img>
             <div className="overlay">
             <div className="imgicons">
            <i class="fa-solid fa-square-share-nodes"></i>
            <i class="fa-brands fa-gratipay"></i>
            <i class="fa-solid fa-circle-play" id="play-video"></i>
            </div>
            <div className="imgtitle">
              <p>title here</p>
            </div>
            <div className="duration">
              2h: 30m
            </div></div>
             </a>
          </div>
          <div className="pmovies-box3">
          <a href="links3">
          <img src="/Images/img2.webp"></img>
          <div className="overlay">
          <div className="imgicons">
            <i class="fa-solid fa-square-share-nodes"></i>
            <i class="fa-brands fa-gratipay"></i>
            <i class="fa-solid fa-circle-play" id="play-video"></i>
            </div>
            <div className="imgtitle">
              <p>title here</p>
            </div>
            <div className="duration">
              2h: 30m
            </div></div></a>
          </div>
          <div className="pmovies-box4">
          <a href="links1">
          <img src="/Images/img2.webp"></img>
          <div className="overlay">
          <div className="imgicons">
            <i class="fa-solid fa-square-share-nodes"></i>
            <i class="fa-brands fa-gratipay"></i>
            <i class="fa-solid fa-circle-play" id="play-video"></i>
            </div>
            <div className="imgtitle">
              <p>title here</p>
            </div>
            <div className="duration">
              2h: 30m
            </div></div></a>
          </div>
          <div className="pmovies-box5">
          <a href="links1">
          <img src="/Images/img2.webp"></img>
          <div className="overlay">
          <div className="imgicons">
            <i class="fa-solid fa-square-share-nodes"></i>
            <i class="fa-brands fa-gratipay"></i>
            <i class="fa-solid fa-circle-play" id="play-video"></i>
            </div>
            <div className="imgtitle">
              <p>title here</p>
            </div>
            <div className="duration">
              2h: 30m
            </div></div></a>
          </div>
          <div className="pmovies-box6">
          <a href="links1">
          <img src="/Images/img2.webp"></img>
          <div className="overlay">
          <div className="imgicons">
            <i class="fa-solid fa-square-share-nodes"></i>
            <i class="fa-brands fa-gratipay"></i>
            <i class="fa-solid fa-circle-play" id="play-video"></i>
            </div>
            <div className="imgtitle">
              <p>title here</p>
            </div>
            <div className="duration">
              2h: 30m
            </div></div></a>
          </div>
          */}
          
        </Slider>
      </div>

    </div></div>
    </body></>
  );
}

export default Popularmovies;
