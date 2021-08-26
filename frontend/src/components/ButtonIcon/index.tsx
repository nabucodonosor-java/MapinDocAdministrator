import './styles.css';

type Props = {
  text: string;
  img: string;
};

const ButtonIcon = ({ text, img }: Props) => (
  <div className="btn-container">
    <div className="btn-text-area">
      <button className="btn-text">
        <h6>{text}</h6>
      </button>
    </div>
    <div className="btn-arrow">
      <img src={img} alt={img} />
    </div>
  </div>
);

export default ButtonIcon;
