import React ,{useState} from "react";
import axios from "axios";

const About = ()=>{
    const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Fetch the APK URL from the API
      const response = await axios.get('https://codecarehub.space/video_adminpenal/apk_files.php', {
        params: { id: 5 } // Pass the ID parameter if needed
      });

      // Log the response to verify the data
      console.log(response.data); // This will log the array of APK info

      // Assuming the API response is an array with an object having the apk_url
      const apkUrl = response.data[0].apk_url; // Get the APK file path
      const fullUrl = `https://codecarehub.space/video_adminpenal/${apkUrl}`; // Form the full URL

      // Create an anchor element and simulate a click for download
      const link = document.createElement('a');
      link.href = fullUrl;
      link.download = 'app.apk'; // Suggest the filename for download

      // Append the link to the body, click it, and then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Failed to fetch APK file.');
      console.error('Error fetching APK URL:', err);
    } finally {
      setIsLoading(false);
    }
  };
    return(
        <>
        <div class="about2" >
                <div class="sec21">
                <h1>Stream the Best <span>Turkish</span>  Dramas for Free</h1>
                 <p>Welcome to Urdu Bolo, your ultimate destination for streaming captivating Turkish television dramas. Enjoy a seamless viewing experience with our user-friendly app, available for download now!</p>
                 <button className="btn" onClick={handleDownload} disabled={isLoading}> {isLoading ? 'Downloading...' : 'Download App'} <i class="fa-brands fa-android"></i></button> {error && <p style={{ color: 'red' }}>{error}</p>}
                 </div>
            <div class="sec22"> 
                <h1>Unlock Exclusive <span> Turkish</span> Dramas</h1>
                 <p>Pay securely on WhatsApp, choose your favorite drama, and unlock private access to watch it right here on our website. Simple, fast, and completely private! </p>
                 <br></br><a href="https://wa.me/+923007392932">
                             <button className="btn">Whatsapp<i class="fa-brands fa-whatsapp"></i></button></a>
            </div>
        </div>
        </>
    )
}
export default About;