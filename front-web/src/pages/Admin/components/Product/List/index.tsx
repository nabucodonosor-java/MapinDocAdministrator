import React, { useState, useCallback, useEffect } from 'react';
import { ProductResponse } from 'types/product';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'utils/request';
import { toast } from 'react-toastify';
import Card from '../Card';
import Pagination from 'components/Pagination';
import BasicLoader from 'components/Loaders/BasicLoader';
import FiltersByName from 'components/Filters/FiltersByName';
import './styles.scss';

const List = () => {
    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [name, setName] = useState('');

    const getProducts = useCallback(() => { 
        const params = {
            page: activePage,
            size: 20,
            direction: 'DESC',
            sort: 'id',
            name
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/products', params })
            .then(response => setProductResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage, name]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);
    }

    const clearFilters = () => {
        setActivePage(0);
        setName('');
    }

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este produto?');

        if (confirm) {
            makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE' })
                .then(() => { 
                    toast.info('Produto deletado com sucesso!');
                    getProducts();
                })
                .catch(() => { 
                    toast.error('Erro ao deletar produto');
                })
        }
    } 

    return (
        <div className="product-list-container">  
            <div className="product-filter-container">
                <FiltersByName
                name={name}
                handleChangeName={handleChangeName}
                clearFilters={clearFilters}
                />

                <button className="btn btn-primary btn-lg mt-3 mb-2" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>

            <div>
                {isLoading ? <BasicLoader /> : (
                    productResponse?.content.map(p => (
                        <Card product={p} key={p.id} onRemove={onRemove} />
                    ))
                )}
                {productResponse && (
                    <Pagination
                        totalPages={productResponse.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                )}
            </div>
        </div>
    )
}

export default List;