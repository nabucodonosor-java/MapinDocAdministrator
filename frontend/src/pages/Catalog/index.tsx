import DoctorCard from 'components/DoctorCard';
import './styles.css';

const Catalog = () => {
  return (
   
    <div className="container my-4">
      <div className="row">
        <div className="col-sm-6 col-md-4 col-xl-3">
          <DoctorCard />
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3">
          <DoctorCard />
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3">
          <DoctorCard />
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3">
          <DoctorCard />
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3">
          <DoctorCard />
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3">
          <DoctorCard />
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3">
          <DoctorCard />
        </div>
        <div className="col-sm-6 col-md-4 col-xl-3">
          <DoctorCard />
        </div>
      </div> 
    </div>

  );
};

export default Catalog;
