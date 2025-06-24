import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ShowSeason() {
  const [seasons, setSeasons] = useState([]); // State to store fetched seasons
  const [loading, setLoading] = useState(true); // State to handle loading
  const { drama_Id, drama_Name } = useParams(); // Get drama_Id and drama_Name from URL params
  const URL = "https://codecarehub.space/video_adminpenal/get_seasons.php";

  useEffect(() => {
    console.log("drama_Id:", drama_Id); // Check if drama_Id is coming correctly

    // Fetch seasons from API
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched seasons:", data); // Check the API response
        const filteredSeasons = (data.seasons || []).filter((season) => {
          return String(season.drama_id).trim() === String(drama_Id).trim();
        });
        console.log("Filtered seasons:", filteredSeasons); // Check filtered result

        setSeasons(filteredSeasons); // Set filtered seasons to state
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Error fetching seasons:", error);
        setLoading(false); // Set loading to false even on error
      });
  }, [drama_Id]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while fetching data
  }

  return (
    <div className="container2">
      <div className="slider-container">
        <div className="headerdata" id="turkiskdrama">
          <h1>{drama_Name}</h1>
          <Link to={"/"}>Back</Link>
        </div>
        <div className="pslides" id="season-grid">
          {seasons.length === 0 ? (
            <div className="no-seasons">
              <h2>No seasons available for this drama.</h2>
            </div>
          ) : (
            seasons.map((season) => (
              <div key={season.id} className="pmovies-box2">
                <Link to={`/catagory/${season.id}`}>
                  <img
                    src={
                      season.thumbnail
                        ? `https://codecarehub.space/video_adminpenal/${encodeURIComponent(
                            season.thumbnail
                          )}`
                        : "/Images/img2.webp"
                    }
                    alt="Season Thumbnail"
                  />
                  <div className="overlay">
                    <div className="imgicons">
                      <i className="fa-solid fa-square-share-nodes"></i>
                      <i className="fa-brands fa-gratipay"></i>
                      <i className="fa-solid fa-circle-play" id="viewplay"></i>
                    </div>
                  </div>
                  <div className="seasonshow">
                    <h2>Season {season.season_number}</h2>
                    <p>Total Episodes: {season.total_episodes}</p>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowSeason;
