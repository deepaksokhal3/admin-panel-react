import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

class ProductsTable extends Component {
    static propTypes = {
        data       : PropTypes.array.isRequired,
        isOrder    : PropTypes.bool,
        isShipment : PropTypes.bool
    }

    static defaultProps = {
        isOrder    : false,
        isShipment : false
    };

    prepareProductName = (product) => {
        let productName = product.name;

        if (product.type === 'BOTTLE' && !this.props.isShipment)  productName = `Возврат: ${product.name}`;

        return productName;
    }

    render() {
        const { data, isOrder } = this.props;
        const productsLength = data.productsItems.length;

        return productsLength ? (

            <div className = 'modalBody-productsWraper'>
                <Table
                    selectable={false}
                    fixedHeader
                    height = {(productsLength > 1 && isOrder) ? '304' : 'auto'}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan = '2' >№</TableHeaderColumn>
                            <TableHeaderColumn colSpan = '3' >Логотип</TableHeaderColumn>
                            <TableHeaderColumn colSpan = '4' >Название</TableHeaderColumn>
                            <TableHeaderColumn colSpan = '2' >Цена</TableHeaderColumn>
                            <TableHeaderColumn colSpan = '3' >Количество</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={false}
                        showRowHover={false}
                        stripedRows={false}
                    >
                        {data.productsItems.map((product, index) => {
                            const currentProductCount = data.productsLinks.find(
                                productItem => product.id === productItem.id
                            ).count;

                            return (
                                <TableRow key={product.id} >
                                    <TableRowColumn  colSpan = '1' >{index + 1}</TableRowColumn>
                                    <TableRowColumn  colSpan = '3' >
                                        <div className = 'modalBody__div-image-wraper'>
                                            <div className = 'modalBody__div-image'>
                                                <img src={product.imageUrl} className= 'modalBody__image' />
                                            </div>
                                        </div>
                                    </TableRowColumn>
                                    <TableRowColumn  colSpan = '3' >{this.prepareProductName(product)}</TableRowColumn>
                                    <TableRowColumn  colSpan = '2' >{product.cost / 100}</TableRowColumn>
                                    <TableRowColumn  colSpan = '2' >{currentProductCount}</TableRowColumn>
                                </TableRow>
                            );
                        })}
                    );
                    </TableBody>
                </Table>
            </div>
        ) : <b style = {{ color: 'red' }}> Продукт был удален, информация отсутствует</b>;
    }
}


export default ProductsTable;
