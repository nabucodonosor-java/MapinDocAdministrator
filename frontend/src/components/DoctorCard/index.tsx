import { Doctor } from 'src/types/doctor';
import './styles.css';

type Props = {
    doctor: Doctor;
}

const DoctorCard = ( {doctor } : Props) => { 
  return (
    <div className="base-card doctor-card-container">
      <div className="doctor-card-top">
        <img src={doctor.imgUrl} alt="doctor-logo" />
      </div>
      <div className="doctor-card-bottom">
        <h6>{doctor.cardName}</h6>
        <p>{doctor.specialty.name}</p>
      </div>
    </div>
  );
};

export default DoctorCard;