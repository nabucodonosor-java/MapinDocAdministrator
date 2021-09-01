import Loading from "src/assets/images/loading.gif";
import "./styles.css";

const HomeLoader = () => {
  return (
    <div className="home=loader">
      <img className="img-loader" src={Loading} alt="Carregando..." />
    </div>
  );
};

export default HomeLoader;
