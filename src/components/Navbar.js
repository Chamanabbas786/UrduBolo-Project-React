import React, {useState, useEffect,useRef} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import img from './logo.jpg';
import "./Menu.css"; // CSS file for styles
const Navbar =(props) => {

   // State to manage the visibility of the search box
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [colorsearch, setcolorsearch] = useState({color: 'white'});

  // Ref to the search box container
  const searchBoxRef = useRef(null);


  // Function to handle click outside the search box
  const handleClickOutside = (event) => {
    // Check if the click was outside the search box
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setIsSearchBoxVisible(true); // Hide the search box
    }
   
  };

  // UseEffect to add event listener for clicks on the window
  useEffect(() => {
    // Adding event listener on mount
    window.addEventListener('click', handleClickOutside);

    // Cleanup: Remove event listener when component unmounts
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Function to handle the search icon click
  const handleSearchIconClick = () => {
    setIsSearchBoxVisible(!isSearchBoxVisible); // Toggle the visibility of the search box
    if(isSearchBoxVisible==true){
      setcolorsearch({color:'white'})
     }
     if(isSearchBoxVisible==false){
      setcolorsearch({color:'#F69301'})
     }
  };

   ///////////////////////////////////////////// Notification parts////////
   const [latestNotification, setLatestNotification] = useState(null);
     const [isVisible, setIsVisible] = useState(false);
     const [ismenuVisible, setIsmenuVisible] = useState(false);
     const [colorbell, setcolorbell] = useState({color: 'white'});
     const [colormenu, setcolormenu] = useState({color: 'white'});
     const [error, setError] = useState(null);
   
     useEffect(() => {
       // Fetch notifications from API
       const fetchLatestNotification = async () => {
         try {
           const response = await fetch('https://codecarehub.space/video_adminpenal/get_notifications.php');
           
           // Check if response is successful
           if (!response.ok) {
             throw new Error(`Failed to fetch data, status: ${response.status}`);
           }
   
           const data = await response.json();
   
           if (data.length > 0) {
             // Find the latest notification
             const latest = data.reduce((latest, current) => {
               return new Date(current.created_at) > new Date(latest.created_at) ? current : latest;
             }, data[0]);
             setLatestNotification(latest);
           } else {
             setError('No notifications available.');
           }
         } catch (err) {
           console.error('Error fetching notifications:', err);
           setError('Failed to fetch notifications. Please try again later.');
         }
       };
   
       fetchLatestNotification();
     }, []);
   
     const handleIconClick = () => {
       setIsVisible(!isVisible);
       if(isVisible==true){
        setcolorbell({color:'white'})
       }
       if(isVisible==false){
        setcolorbell({color:'#F69301'})
       }
     };
     const handlemenuClick = () => {
      setIsmenuVisible(!ismenuVisible);
      if(ismenuVisible==true){
       setcolormenu({color:'white'})
      }
      if(ismenuVisible==false){
       setcolormenu({color:'#F69301'})
      }
    };
   
return (

    <>
    <head>
            <meta charset="UTF-8"/>
             <meta name="description" content="Free Web tutorials"/>
             <meta name="keywords" content="HTML, CSS, JavaScript, React js"/>
             <meta name="author" content="Chaman Abbas"/>
             <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link rel="icon" type="image/png" href={img}/>
           <title>urdubolo</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
     </head>
    <div className='navbar11'>

                <div className="logo">
                <img  src= {img} alt="logo cant load" className="logoimg"></img>
                <h2  id="logonavtext">{props.name}</h2>
                </div>
                <div className="navlinks">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/private">Private</Link></li>
                        <li><Link to="/popular">Popular</Link></li>
                        <li><Link to="/popular">Contact</Link></li>
                    </ul>
                </div>
                    <div className="icons">
                    <i className="fa-solid fa-magnifying-glass" id="search" onClick={handleSearchIconClick} style={colorsearch}></i>
                    {isSearchBoxVisible && (
                    <div className= "search-container" ref={searchBoxRef}>   
                         <input type='search' placeholder='Search..' name='search' id='sbox'></input>
                         </div> )}
                     <div style={{ position: 'relative' }}>
                    <i className="fa-sharp fa-solid fa-bell" id='bell' onClick={handleIconClick} style={colorbell}></i>
                          {/* Notification Dropdown */}
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '0',
            backgroundColor: 'white',
            border: '2px solid #F69301',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '300px',
            zIndex: 1000,
          }}
        >
          {error ? (
            <div style={{ padding: '10px', textAlign: 'center', color: 'red' }}>{error}</div>
          ) : latestNotification ? (
            <div
              style={{
                padding: '10px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <h4 style={{ margin: '0 0 5px', fontSize: '16px' }}>{latestNotification.title}</h4>
              <p style={{ margin: '0 0 5px', fontSize: '14px', color: '#555' }}>
                {latestNotification.message}
              </p>
              <small style={{ fontSize: '12px', color: '#aaa' }}>
                {new Date(latestNotification.created_at).toLocaleString()}
              </small>
            </div>
          ) : (
            <div style={{ padding: '10px', textAlign: 'center' }}>Loading...</div>
          )}
        </div>
      )}
    </div>
                    <Link to="/login"><i className="fa-solid fa-user"></i>  </Link>
                    {ismenuVisible && (
                   <div className="navlink1"><ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/private">Private</Link></li>
                    <li><Link to="/popular">Popular</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                   </ul>
                    </div>
                  )}
                    <i className="fa-solid fa-bars menu-icon" id="menu" onClick={handlemenuClick} style={colormenu}></i>
                    </div>
                
        </div>

    </>
)
}
export default Navbar
Navbar.prototype ={
    titleh: PropTypes.string,
  }

Navbar.defaultProps = {
    title: "set title here",}