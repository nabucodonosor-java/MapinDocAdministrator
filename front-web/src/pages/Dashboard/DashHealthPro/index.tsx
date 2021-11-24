import DashPlaces from "../components/DashPlaces";
import DashOrthoSpecialization from "../components/DashOrthoSpecialization";
import DashSpecialty from "../components/DashSpecialty";
import './styles.scss';

const DashHealthPro = () => {

    return (
        <div className="dash-hp-container">
           <DashSpecialty />
           <DashPlaces />
           <DashOrthoSpecialization />    
        </div>
    );
}

export default DashHealthPro;