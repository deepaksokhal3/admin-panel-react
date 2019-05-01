import React                 from 'react';
import { List }              from 'admin-on-rest';
import { DefaultSortValue }  from '../../constants';
import GridList              from './GridList';
import ProductsFilter        from './ProductsFilter';

export default function ProductsList(props) {
    return (
        <List
            title= 'resources.products.name'
            {...props}
            filters={<ProductsFilter />}
            sort = {DefaultSortValue}
        >
            <GridList />
        </List>
    );
}
