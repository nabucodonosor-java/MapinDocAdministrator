import './styles.css';

const DoctorCard = () => { 
  return (
    <div className="base-card doctor-card-container">
      <div className="doctor-card-top">
        <img src="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/Adriano+Scaff.png" alt="doctor-logo" />
      </div>
      <div className="doctor-card-bottom">
        <h6>Adriano Scaff</h6>
        <p>Especialidade</p>
      </div>
    </div>
  );
};

export default DoctorCard;
