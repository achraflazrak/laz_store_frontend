import React from 'react';
import ProductItem from './ProductItem';
import { useSelector } from 'react-redux';

export default function ProductList({ products, fetchNextPrevProducts }) {
    const { lang } = useSelector((state) => state.setting);

    const renderPaginationLinks = () => (
        <ul className='pagination'>
            {
                products?.links?.map((link, index) => (
                    <li key={index} className={`page-item ${!link.url? 'disabled' : ''}`}>
                        <a href='#' style={{ cursor: 'pointer' }}
                            onClick={() => fetchNextPrevProducts(link.url)}
                            className={`page-link ${link.active? 'active' : ''}`}>
                            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                        </a>
                    </li>
                ))
            }
        </ul>
    )

    return (
        <>
            <div className='row'>
                {
                    products?.data?.map(product => <ProductItem key={product.id}
                        product={product} />)
                }
            </div>
            <div className='my-4 d-flex justify-content-between'>
                <div className='text-muted'>
                    {lang === 'en' ?
                        `Showing ${products.from || 0} to ${products.to || 0} from ${products.total || 0} results.`
                        :
                        `Affichage de ${products.from || 0} à ${products.to || 0} sur ${products.total || 0} résultats.`
                    }
                </div>
                <div>
                    {renderPaginationLinks()}
                </div>
            </div>
        </>
    )
    
}
