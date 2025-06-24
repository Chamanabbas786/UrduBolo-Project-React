import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Popularmovies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetch("https://codecarehub.space/video_adminpenal/get_dramas.php")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false); // Data loaded, set loading to false
      })
      .catch((error) => {
        console.error("Error in: " + error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  return (
    <>
      <body>
        <div className="container2">
          <div className="slider-container">
            <div className="headerdata" id="turkiskdrama">
              <h1>Turkish Dramas</h1>
              <Link to={"/"}>Back</Link>
            </div>
            <div className="pslides" id="season-grid">
              {loading ? ( // Check loading state
                <div className="loading-indicator">
                  <p>Loading...</p> {/* Add a spinner or placeholder */}
                </div>
              ) : (
                data.map((item) => (
                  <div key={item.id} className="pmovies-box2">
                    <Link to={`/season/${item.name}/${item.id}`}>
                      <img
                        src={
                          item.thumbnail
                            ? `https://codecarehub.space/video_adminpenal/${encodeURIComponent(
                                item.thumbnail
                              )}`
                            : "/Images/img2.webp"
                        }
                        alt="img cant load"
                      />
                      <div className="overlay">
                        <div className="imgicons">
                          <i className="fa-solid fa-square-share-nodes"></i>
                          <i className="fa-brands fa-gratipay"></i>
                          <i
                            className="fa-solid fa-circle-play"
                            id="viewplay"
                          ></i>
                        </div>
                        <div className="imgtitle">
                          <p>{item.name}</p>
                        </div>
                        <div className="duration">2h: 30m</div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Popularmovies;
