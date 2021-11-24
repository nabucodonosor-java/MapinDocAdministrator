import { useEffect, useState } from 'react';
import { PlaceServiceResponse } from 'types/placeService';
import { makePrivateRequest } from 'utils/request';
import './styles.scss';

const DashPlaces = () => {

    const [placeResponse, setPlaceResponse] = useState<PlaceServiceResponse>();
    let countClinic = 0;
    let countMedicalCenter = 0;
    let countHospital = 0;
    let countCir = 0;
    let countCityHall = 0;
    let countApae = 0;

    useEffect(() => {
        makePrivateRequest({ url: '/places' })
        .then(response => setPlaceResponse(response.data))
       
        .finally(() => {        
        })
    }, []);

    return (
        <div className="dash-container">
            <div className="d-none">
            {placeResponse?.content.map(p => (
            <>
                {p.clinic ? ++countClinic : countClinic}
                {p.medicalCenter ? ++countMedicalCenter : countMedicalCenter}
                {p.hospital ? ++countHospital : countHospital}
                {p.cir ? ++countCir : countCir}
                {p.cityHall ? ++countCityHall : countCityHall}
                {p.apae ? ++countApae : countApae}
            </>
            ))};
            </div>
            <div className="base-card dash-places">
            <h6>Total de Locais de Atendimento Cadastrados - <u>{countClinic + countMedicalCenter + countHospital + countCir + countCityHall + countApae}</u></h6>
                <table className="table text-center">
                    <tr>
                        <th>Local</th>
                        <th>Qtde</th>
                    </tr>
                    <tr>
                        <td>
                        Clínica
                        </td>
                        <td>
                            {countClinic}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Centro Médico
                        </td>
                        <td>
                            {countMedicalCenter}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Hospitais
                        </td>
                        <td>
                            {countHospital}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        CIR
                        </td>
                        <td>
                            {countCir}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Prefeitura
                        </td>
                        <td>
                            {countCityHall}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Apae
                        </td>
                        <td>
                            {countApae}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default DashPlaces;