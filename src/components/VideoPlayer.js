import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const { season_Id } = useParams();
  const videoRef = useRef(null);


  // Disable right-click and screenshot shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeydown = (e) => {
      const restrictedKeys = [
        "PrintScreen",
        "s", // Save
        "u", // View Source
        "I", // DevTools
      ];
      if (
        restrictedKeys.includes(e.key) ||
        (e.ctrlKey && restrictedKeys.includes(e.key.toLowerCase())) ||
        (e.metaKey && e.key === "screenshot")
      ) {
        e.preventDefault();
        alert("Screenshots and copying are disabled on this page.");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  // DevTools detection
  useEffect(() => {
    const detectDevTools = () => {
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        alert("Developer tools detected. Video playback paused.");
        setPlaying(false);
      }
    };

    const interval = setInterval(detectDevTools, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch episodes by season ID
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(
          "https://codecarehub.space/video_adminpenal/fetch_videos.php"
        );

        if (response.data && Array.isArray(response.data.videos)) {
          const filteredVideos = response.data.videos.filter(
            (video) => String(video.season_id).trim() === String(season_Id).trim()
          );
          setEpisodes(filteredVideos);
        } else {
          console.warn("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, [season_Id]);

  // Handle video playback
  useEffect(() => {
    if (videoRef.current) {
      playing ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [playing]);

  // Video control handlers
  const handlePlayPause = () => setPlaying((prev) => !prev);
  const handleNext = () => {
    setCurrentEpisode((prev) => (prev + 1) % episodes.length);
    setPlaying(true);
    setLoading(true);
  };
  const handleBack = () => {
    setCurrentEpisode((prev) => (prev - 1 + episodes.length) % episodes.length);
    setPlaying(true);
    setLoading(true);
  };
  const handleEpisodeClick = (index) => {
    setCurrentEpisode(index);
    setPlaying(true);
    setLoading(true);
  };

  // Video loaded handler
  const handleVideoLoaded = () => setLoading(false);

  return (
    <div className="video-container">
      {episodes.length > 0 ? (
        <>
          <div className="video-section">
            {loading && <p className="loading-message">Please wait, loading video...</p>}

            <div className="watermark-overlay">
              This Content is Property of URDU BOLO App - {new Date().toLocaleString()}
            </div>

            <video
              ref={videoRef}
              key={encodeURIComponent(episodes[currentEpisode].video_path)}
              controls
              autoPlay={playing}
              className="video-player"
              onLoadedData={handleVideoLoaded}
              preload="auto"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
            >
              <source
                src={`https://codecarehub.space/video_adminpenal/${encodeURIComponent(
                  episodes[currentEpisode].video_path
                )}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            <div className="current-title">
              <strong>Now Playing:</strong> Episode {episodes[currentEpisode].episode_number} -{" "}
              {episodes[currentEpisode].description || "Untitled"}
            </div>

            <div className="controls">
              <button onClick={handleBack}>
                <i className="fa-solid fa-backward"></i> Back
              </button>
              <button onClick={handlePlayPause}>
                <i className={`fa-solid ${playing ? "fa-pause" : "fa-play"}`}></i>{" "}
                {playing ? "Pause" : "Play"}
              </button>
              <button onClick={handleNext}>
                <i className="fa-solid fa-forward"></i> Next
              </button>
            </div>
          </div>

          <div className="episode-list">
            <h3>All Episodes</h3>
            <ul>
              {episodes.map((episode, index) => (
                <li
                  key={episode.episode_number}
                  className={currentEpisode === index ? "active" : ""}
                  onClick={() => handleEpisodeClick(index)}
                >
                  <img
                    src={`https://codecarehub.space/video_adminpenal/${encodeURIComponent(
                      episode.thumbnail
                    )}`}
                    alt={`Episode ${episode.episode_number}`}
                  />
                  <p>
                    Episode {episode.episode_number} -{" "}
                    {episode.description || "Untitled"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="no-videos">
          <h2>Videos not Uploaded Yet...</h2>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
