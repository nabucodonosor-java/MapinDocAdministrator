import ButtonIcon from "src/components/ButttonIcon";
import ImgDocMkt from "src/assets/images/home-doctor-mkt.jpeg";
import ImgLab from "src/assets/images/home-lab.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { makePrivateRequest } from "src/utils/requests";
import HomeLoader from './components/HomeLoader';

import "./styles.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    makePrivateRequest({ url: "/" })
      .then((response) => response.data)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <HomeLoader />
      ) : (
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
      )}
    </>
  );
};

export default Home;
