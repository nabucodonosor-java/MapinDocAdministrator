import FaceIcon from "core/assets/images/face-icon.png";
import InstaIcon from "core/assets/images/insta-icon.png";
import MapinImg from "core/assets/images/mapin-img.png";
import "./styles.scss";

const Footer = () => {
  return (
    <div className="footer-container"> 

       <div className="footer-img">
         <img src={MapinImg} alt="face" /> 
       </div>

       <div className="footer-social">

         <div className="footer-social-content">
            <img src={FaceIcon} alt="face" />
            <a href="https://www.facebook.com/Franco.Canizo.Sobrinho/">www.facebook.com/MapinSoft</a>
         </div>

         <div className="footer-social-content">
            <img src={InstaIcon} alt="face" />
          <a href="https://www.instagram.com/francocanizobrasil/">www.instagram.com/MapinSoft</a>
         </div>

       </div>   
    </div>
  );
};

export default Footer;
