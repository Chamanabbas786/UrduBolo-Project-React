import './cssfile.css';

import Privates from './components/Private.js';
import { Routes, Route } from "react-router-dom";
import NAVBAR from './components/Navbar.js';
import HOME from './components/Home.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Popularmovies from './components/Popularmovies.js';
import About from './components/About.js';
import Foter from './components/Foter.js';
import LoginPage from './components/LoginPage.js';
import RegisterPage from './components/RegisterPage.js';
import VideoPlayer from './components/VideoPlayer.js';
import Viewall from './components/Viewall.js';
import ShowSeason from './components/ShowSeason.js';

function App() {
  return (
    <>
      <NAVBAR title={"URDU BOLO"} name={"URDU BOLO"} />
      <Routes>
        <Route path="/" element={<HOME />} />
        <Route path="/about" element={<About />} />
        <Route path="/popular" element={<Popularmovies />} />
        <Route path="/private" element={<Privates />} />
        <Route path="/season/:drama_Name/:drama_Id" element={<ShowSeason />} />
        <Route path="/catagory/:season_Id" element={<VideoPlayer />} />
        <Route path="/watchall" element={<Viewall />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Foter />
    </>
  );
}

export default App;
