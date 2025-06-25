import React,{useState, useEffect} from "react";
import NAVBAR from './Navbar.js';
import IMG from './image1.jpeg'
import About from './About.js';
import Popularmovies from './Popularmovies.js';
import Featureapp from './Featureapp.js'
import Seasons from "./Seasons.js";
const Home = ()=> {
  
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            title: 'Hudutsuz sevda',
            views: '567 view',
            date: 'Oct 2023',
            description: "In Istanbul's vibrant streets, one family's fate is shaken by love, secrets, and betrayal.",
            img: IMG,
        },
        // Add more slides if needed
        {
            title: 'Another Story',
            views: '320 views',
            date: 'Sep 2023',
            description: "A tale of courage and determination in the face of adversity.",
            img: IMG,
        },
        {
            title: 'Final Chapter',
            views: '1,045 views',
            date: 'Aug 2023',
            description: "An epic conclusion to a saga of love and betrayal.",
            img: IMG,
        }
        // { ... },
        // { ... }
    ];
    useEffect(() => {
        const autoSlide = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);

        return () => clearInterval(autoSlide);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };
    // const nextSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    // };
    // const back = goToIndex }));code generates random [unique comnabe.""
    return(
<>
{/* <NAVBAR></NAVBAR> */}
<div className="home-container">
<div className="container1">


            <i className="fa-solid fa-chevron-left" id="back" onClick={prevSlide}></i>
            <div className="boxes" style={{ transform: `translateX(-${currentIndex * 100}%)`, display: 'flex', transition: 'transform 0.5s ease-in-out' }}>
                {slides.map((slide, index) => (
                    <div className="box" key={index} style={{ 
                        flex: '0 0 100%', 
                        backgroundColor: index === currentIndex ? 'transparent' : 'rgba(38, 37, 37, 0.41)', 
                        position: 'relative' 
                    }}>
                        <div className="content1">
                            <h1>{slide.title}</h1>
                            <p>{slide.views} • {slide.date}</p>
                            <div className="innerbox">
                                <p>{slide.description}</p>
                                {/* <i className="fa-solid fa-circle-play"></i>
                                <h4>Watch Later</h4> */}
                            </div>
                            <button className="btn"><i className="fa-solid fa-play"></i>PLAY NOW</button>
                        </div>
                        <div className="sld">
                        <div className="slidimg">
                        <img src={slide.img} alt={slide.title}></img>
                        </div></div>
                    </div>
                ))}
            </div>
            <i className="fa-solid fa-chevron-right" id="forward" onClick={nextSlide}></i>
            </div>    </div>
                     <Seasons/> <Popularmovies/>
                             <Featureapp/>
                          <About/>
                        
</>);
}
export default Home;