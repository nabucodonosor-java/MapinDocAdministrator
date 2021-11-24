import { useEffect, useState } from 'react';
import { HealthProfessionalResponse } from 'types/healthProfessional';
import { makePrivateRequest } from 'utils/request';
import './styles.scss';

const DashSpecialty = () => {

    const [hpResponse, setHPResponse] = useState<HealthProfessionalResponse>();
    let countOrtho = 0;
    let countVascular = 0;
    let countNeuro = 0;
    let countFisio = 0;
    let countTO = 0;
    let countReumato = 0;

    useEffect(() => {
        makePrivateRequest({ url: '/hp' })
        .then(response => setHPResponse(response.data))
        .finally(() => {  
            window.scrollTo(0, 0);      
        })
    }, []);

    return (
        <div className="dash-container">
            <div className="d-none">
            {hpResponse?.content.map(hp => (
            <>
                {hp.profession.name === 'ORTOPEDISTA' ? ++countOrtho : countOrtho}
                {hp.profession.name === 'VASCULAR' ? ++countVascular : countVascular}
                {hp.profession.name === 'NEUROCIRURGIÃO' ? ++countNeuro : countNeuro}
                {hp.profession.name === 'FISIOTERAPEUTA' ? ++countFisio : countFisio}
                {hp.profession.name === 'TERAPEUTA OCUPACIONAL' ? ++countTO : countTO}
                {hp.profession.name === 'REUMATOLOGISTA' ? ++countReumato : countReumato}
            </>
            ))};
            </div>
            <div className="base-card dash-specialty">
                <h6>Total de Profissionais da Saúde Cadastrados - <u>{countOrtho + countVascular + countNeuro + countFisio + countTO + countReumato}</u></h6>
                <table className="table text-center">
                    <tr>
                        <th>Profissão</th>
                        <th>Total</th>
                    </tr>
                    <tr>
                        <td>
                        Ortopedistas
                        </td>
                        <td>
                            {countOrtho}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Vascular
                        </td>
                        <td>
                            {countVascular}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Neurocirurgião
                        </td>
                        <td>
                            {countNeuro}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Reumatologista
                        </td>
                        <td>
                            {countReumato}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Fisioterapeuta
                        </td>
                        <td>
                            {countFisio}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Terapeuta Ocupacional
                        </td>
                        <td>
                            {countTO}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default DashSpecialty;