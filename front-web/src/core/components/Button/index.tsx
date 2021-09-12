import './styles.scss';

type Props = {
  text: string;
};

const Button = ({ text }: Props) => (
  <div className="btn-btn-container">
    <div className="btn-btn-text-area">
      <button className="btn-btn-text">
        <h6>{text}</h6>
      </button>
    </div>
  </div>
);

export default Button;