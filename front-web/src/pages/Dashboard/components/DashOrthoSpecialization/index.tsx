import { useEffect, useState } from 'react';
import { HealthProfessionalResponse } from 'types/healthProfessional';
import { makePrivateRequest } from 'utils/request';
import './styles.scss';

const DashOrthoSpecialization = () => {

    const [hpResponse, setHPResponse] = useState<HealthProfessionalResponse>();
    let countAmputacao = 0;
    let countPe = 0;
    let countTornozelo = 0;
    let countJoelho = 0;
    let countQuadril = 0;
    let countColuna = 0;
    let countMao = 0;
    let countCotovelo = 0;
    let countOmbro = 0;
    let countGeral = 0;

    useEffect(() => {
        makePrivateRequest({ url: '/hp' })
        .then(response => setHPResponse(response.data))
       
        .finally(() => {        
        })
    }, []);

    return (
        <div className="dash-container">
            <div className="d-none">
            {hpResponse?.content.map(hp => (
            <>
                {hp.specializations.map(spe => (
                    spe.name === 'Amputação' ? ++countAmputacao : countAmputacao
                ))}

                {hp.specializations.map(spe => (
                    spe.name === 'Pé' ? ++countPe : countPe
                ))}

                {hp.specializations.map(spe => (
                    spe.name === 'Tornozelo' ? ++countTornozelo : countTornozelo
                ))}

                {hp.specializations.map(spe => (
                    spe.name === 'Joelho' ? ++countJoelho : countJoelho
                ))}

                {hp.specializations.map(spe => (
                    spe.name === 'Quadril' ? ++countQuadril : countQuadril
                ))}

                {hp.specializations.map(spe => (
                    spe.name === 'Coluna' ? ++countColuna : countColuna
                ))}
                
                {hp.specializations.map(spe => (
                    spe.name === 'Mão' ? ++countMao : countMao
                ))}

                {hp.specializations.map(spe => (
                    spe.name === 'Cotovelo' ? ++countCotovelo : countCotovelo
                ))}

                {hp.specializations.map(spe => (
                    spe.name === 'Ombro' ? ++countOmbro : countOmbro
                ))}

                {hp.specializations.map(spe => (
                    spe.name === 'Ortopedia Geral' ? ++countGeral : countGeral
                ))}
               
            </>
            ))};
            </div>
            <div className="base-card dash-specialty">
                <h6><strong>Totais por Especialidades Ortopédicas</strong></h6>
                <table className="table text-center">
                    <tr>
                        <th>Especialidade</th>
                        <th>Total</th>
                    </tr>
                    <tr>
                        <td>
                        Amputação
                        </td>
                        <td>
                            {countAmputacao}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Pé
                        </td>
                        <td>
                            {countPe}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Tornozelo
                        </td>
                        <td>
                            {countTornozelo}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Joelho
                        </td>
                        <td>
                            {countJoelho}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Quadril
                        </td>
                        <td>
                            {countQuadril}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Coluna
                        </td>
                        <td>
                            {countColuna}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Mão
                        </td>
                        <td>
                            {countMao}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Cotovelo
                        </td>
                        <td>
                            {countCotovelo}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Ombro
                        </td>
                        <td>
                            {countOmbro}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Ortopedia Geral
                        </td>
                        <td>
                            {countGeral}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default DashOrthoSpecialization;