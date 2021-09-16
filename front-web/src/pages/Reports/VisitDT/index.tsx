import React, { useState, useCallback, useEffect } from 'react';
import { makePrivateRequest } from 'core/utils/request';
import Pagination from 'core/components/Pagination';
import { VisitResponse } from 'core/types/visit';
import HomeLoader from 'pages/Home/components/HomeLoader';
import { formatLocalDate } from 'core/utils/format';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import './styles.scss';

const VisitDT = () => {
    const [visitResponse, setVisitResponse] = useState<VisitResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getVisits = useCallback(() => {
        const params = {
            page: activePage,
            size: 100,
            direction: 'DESC',
            sort: 'visitDate'
        }
        setIsLoading(true);
        makePrivateRequest({ url: `/visits?page=${activePage}`, params })
       .then(response => setVisitResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage]);

    useEffect(() => {
        getVisits();    
    }, [getVisits]);
    
    return (
        <div className="report-div">
            
            <div className="text-center mt-3 mb-2">
            <div className="visitDT-header">
              <Link to="../" className="visitDT-goback">
                <ArrowIcon className="visitDT-icon-goback"/>
                <h3>VOLTAR</h3>
                
                </Link> 
     
            </div>
            <h1 className="">TODAS AS VISITAS</h1>
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <HomeLoader /> : (
                    <div className="table-responsive">
                    <table className="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Cidade</th>
                                <th>Especialidade</th>
                                <th>Médico Visitado?</th>
                                <th>Dr.(a)</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visitResponse?.content.map(item => (
                                <tr key={item.id}>
                                    <td>{formatLocalDate(item.visitDate, "dd/MM/yyyy")}</td>
                                    <td>{item.doctor.placeService.localidade}</td>
                                    <td>{item.doctor.specialty.name}</td>
                                    <td className={ item.success ? "table-field-success text-center" : "table-field-not-success text-center" }>{item.success.toString().toUpperCase()}</td>
                                    <td>{item.doctor.name}</td>
                                    <td>{item.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
                {visitResponse && (
                <Pagination 
                totalPages={visitResponse.totalPages}
                onChange={page => setActivePage(page)}
                />
            )}             
            </div>
        </div>
    )
}

export default VisitDT;