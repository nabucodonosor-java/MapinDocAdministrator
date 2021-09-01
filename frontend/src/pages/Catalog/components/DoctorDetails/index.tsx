import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Doctor } from "src/types/doctor";
import { makePrivateRequest } from "src/utils/requests";
import { ReactComponent as ArrowIcon } from "src/assets/images/arrow.svg";
import "./styles.css";
import DoctorInfoLoader from "../Loaders/DoctorInfoLoader";
import DoctorDescriptionLoader from "../Loaders/DoctorDescriptionLoader";

type ParamsType = {
  doctorId: string;
};

const DoctorDetails = () => {
  const { doctorId } = useParams<ParamsType>();
  const [doctor, setDoctor] = useState<Doctor>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    makePrivateRequest({ url: `/doctors/${doctorId}` })
      .then((response) => setDoctor(response.data))
      .finally(() => setIsLoading(false));
  }, [doctorId]);

  return (
    <div className="doctor-details-container">
      <div className="base-card doctor-details">
        <Link to="/doctors" className="doctor-details-goback">
          <ArrowIcon className="doctor-details-icon-goback" />
          <h1 className="doctor-details-text-goback">voltar</h1>
        </Link>
        <div className="doctor-details-div-info">
          {isLoading ? (
            <DoctorInfoLoader />
          ) : (
            <div className="medico-details-card">
              <div className="text-center">
                <img
                  src={doctor?.imgUrl}
                  alt={doctor?.name}
                  className="doctor-details-image"
                />
              </div>
              <h1 className="doctor-details-name">{doctor?.name}</h1>
              <div className="doctor-details-specialty">
                <h6 className="doctor-details-specialty-title">
                  {doctor?.specialty.name}
                </h6>
              </div>
            </div>
          )}
        </div>
        <div className="base-card doctor-details-info-card">
          {isLoading ? (
            <DoctorDescriptionLoader />
          ) : (
            <div className="doctor-details-info-fields">
              <div className="mb-2">
                <h6 className="doctor-details-info-title">CRM</h6>
                {doctor?.crm}
              </div>
              <div className="mb-2">
                <h6 className="doctor-details-info-title">NOME</h6>
                {doctor?.name}
              </div>
              <div className="mb-2">
                <h6 className="doctor-details-info-title">CELULAR</h6>
                {doctor?.phone}
              </div>
              <div className="mb-2">
                <h6 className="doctor-details-info-title">EMAIL</h6>
                {doctor?.email}
              </div>
              <h1 className="doctor-details-large-text-title">Currículo</h1>
              <p className="doctor-details-large-text-text">{doctor?.resume}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
