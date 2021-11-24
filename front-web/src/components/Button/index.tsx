import './styles.scss'; 

type Props = {
  text: string;
};

const Button = ({ text }: Props) => (
  <div className="btn-btn-container">
    <button className="btn-btn-text">
      <h6>{text}</h6>
    </button>
  </div>

);

export default Button;