import ButtonIcon from "src/components/ButttonIcon";
import ImgDocMkt from "src/assets/images/home-doctor-mkt.jpeg";
import ImgLab from "src/assets/images/home-lab.jpeg";
import "./styles.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="base-card home-card-container">
        <h6>Trade&Marketing</h6>
        <div className="home-img-container">
          <img src={ImgDocMkt} alt="logo" className="home-img" />
        </div>
        <Link to="/doctors">
          <ButtonIcon
            text="Busca Médicos"
            img="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/icon-trade.png"
          />
        </Link>
      </div>
      <div className="base-card home-card-container">
        <h6>Laboratório</h6>
        <div className="home-img-container">
            <img src={ImgLab} alt="logo" className="home-img" />
        </div>
        <Link to="lab">
          <ButtonIcon
            text="Acompanhe Serviços"
            img="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/icon-lab.png"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
