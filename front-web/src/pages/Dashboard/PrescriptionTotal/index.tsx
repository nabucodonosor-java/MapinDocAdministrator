
import AverageByProductChart from "components/Charts/AverageByProductChart";
import DonutChart from "components/Charts/DonutChart";
import './styles.scss';

const PrescriptionTotal = () => {

    return(
        <div className="donut-prescription-container">
            <DonutChart />
            <AverageByProductChart />
        </div>
    );
}

export default PrescriptionTotal;


