import React from 'react'
import { useSelector } from 'react-redux';

export default function Categories({ categories, handleSCategoryChange }) {
      const { lang } = useSelector((state) => state.setting);

  return (
    <ol className='list-group list-group-numbered'>
        {
              categories?.map(category => (
                  <li key={category.id} className='list-group-item d-flex justify-content-between align-items-start'>
                      <div className='ms-2 me-auto'>
                        <div>
                              <a href='#'
                                  onClick={() => handleSCategoryChange({ param: 'category', slug: category.slug })}
                                  style={{ cursor: 'pointer' }}
                                className='text-decoration-none text-dark fw-bold'>
                                {lang === 'en'? category.name_en : category.name_fr}
                            </a>
                        </div>
                        {
                            category?.subcategories?.map(subcategory => (
                                <a key={subcategory.id} href='#'
                                    onClick={() => handleSCategoryChange({ param: 'subcategory', slug: subcategory.slug })}
                                    style={{ cursor: 'pointer' }}
                                    className='btn btn-link text-decoration-none text-muted'>
                                    <i>{lang === 'en'? subcategory.name_en : subcategory.name_fr}</i>
                                </a>      
                            ))
                         }  
                      </div>
                      <span className='badge bg-dark rounded-pill'>
                          { category.products.length }
                      </span>
                 </li>
              ))
        }      
    </ol>
  )
}
