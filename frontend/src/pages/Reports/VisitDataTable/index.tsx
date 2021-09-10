import React, { useState, useCallback, useEffect } from 'react';
import { makePrivateRequest } from 'core/utils/request';
import Pagination from 'core/components/Pagination';
import { VisitResponse } from 'core/types/visit';
import HomeLoader from 'pages/Home/components/HomeLoader';
import '../styles.scss';
import { formatLocalDate } from 'core/utils/format';

const List = () => {
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
            <h3 className="report-title">Pesquisas Avançadas - Médicos (as)</h3>
            <div className="d-flex justify-content-between admin-div-btn">
                <h1>FILTROS</h1>
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <HomeLoader /> : (
                    <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th className="text-center">Data</th>
                                <th className="text-center">Médico Visitado?</th>
                                <th>Dr.(a)</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visitResponse?.content.map(item => (
                                <tr key={item.id}>
                                    <td className="text-center">{formatLocalDate(item.visitDate, "dd/MM/yyyy")}</td>
                                    <td className="text-center">
                                    {item.success.toString().toUpperCase()}
                                    </td>
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

export default List;