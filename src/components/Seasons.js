import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
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

function Seasons() {
  const [seasons, setSeasons] = useState([]); // State to store fetched seasons
  const [loading, setLoading] = useState(true); // State to handle loading

  const URL = "https://codecarehub.space/video_adminpenal/get_seasons.php";

  useEffect(() => {
    // Fetch seasons from API
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSeasons(data.seasons || []); // Set the fetched seasons to state
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Error fetching seasons:", error);
        setLoading(false); // Set loading to false even on error
      });
  }, []);

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
        breakpoint: 600,
        settings: { slidesToShow: 2, centerPadding: "5px", arrows: false },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1, // 1 slide for mobile screens
          centerPadding: "1px", // Adjust padding for mobile screens
          arrows: false, // Disable default arrow
        },
      },
    ],
  };

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while fetching data
  }

  return (
    <div className="container2">
      <div className="slider-container">
        <h1>Top Seasons to Watch</h1>
        <div className="slides">
          <Slider {...settings}>
            {seasons.map((season) => (
              <div key={season.id} id="seasons">
                <Link to={`/catagory/${season.id}`}>
                 <img
                       src={
                              season.thumbnail
                                ? `https://codecarehub.space/video_adminpenal/${encodeURIComponent(season.thumbnail)}`
                                    : "/Images/img2.webp"
                             }
                                alt="img cant load"/>
                  <h3>Season {season.season_number}</h3>
                  <p>Total Episodes: {season.total_episodes}</p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Seasons;
