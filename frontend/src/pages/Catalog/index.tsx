import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DoctorCard from "src/components/DoctorCard";
import DoctorFilters from "src/components/DoctorFilters";
import Pagination from "src/components/Pagination";
import { DoctorResponse } from "src/types/doctor";
import { Specialization } from "src/types/specialization";
import { makePrivateRequest } from "src/utils/requests";
import DoctorCardLoader from "./components/Loaders/DoctorCardLoader";
import "./styles.css";

const Catalog = () => {
  const [doctorResponse, setDoctorResponse] = useState<DoctorResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState<Specialization>();

  const getDoctors = useCallback(() => {
    const params = {
      page: activePage,
      size: 8,
      name,
      specializationId: specialization?.id,
    };

    setIsLoading(true);
    makePrivateRequest({ url: "/doctors", params })
      .then((response) => setDoctorResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage, name, specialization]);

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  const handleChangeName = (name: string) => {
    setActivePage(0);
    setName(name);
  }

  const handleChangeSpecialization = (specialization: Specialization) => {
    setActivePage(0);
    setSpecialization(specialization);
  }

  const clearFilters = () => {
    setActivePage(0);
    setSpecialization(undefined);
    setName('');
  }


  return (
    <div className="doctor-catalog-container">
      <div className="catalog-filter-container">
        <DoctorFilters
        name={name}
        specialization={specialization}
        handleChangeName={handleChangeName}
        handleChangeSpecialization={handleChangeSpecialization}
        clearFilters={clearFilters}
        />
      </div>
      {isLoading ? <DoctorCardLoader /> : (
        <div className="col-sm-6 col-lg-4 col-xl-3">
          {doctorResponse?.content.map(doc => (
            <Link to={`/doctors/${doc.id}`} key={doc.id}>
              <DoctorCard doctor={doc} />
            </Link>
          ))}
        </div>
      )}
      {doctorResponse && (
        <Pagination totalPages={doctorResponse.totalPages} onChange={page => setActivePage(page)} />
      )}
    </div>
  );
};

export default Catalog;
