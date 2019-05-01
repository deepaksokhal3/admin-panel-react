import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import Moment               from 'moment';
import 'moment/locale/ru';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter
} from 'material-ui/Table';
import RefreshIcon     from 'material-ui/svg-icons/navigation/refresh';
import FlatButton from 'material-ui/FlatButton';
import FullNameField from '../FullNameField';
import Button from '../Button';
import Pagination from './TableFooter';
import style from './inlineStyles';
import './styles.css';


class ShipmentsTable extends Component {
    static propTypes = {
        data            : PropTypes.array.isRequired,
        onLoadMore      : PropTypes.func,
        onOpenModal     : PropTypes.func,
        totalCountItems : PropTypes.number
    }

    static defaultProps = {
        onLoadMore      : () => {},
        onOpenModal     : () => {},
        totalCountItems : 0
    }

    state = {
        shipmentsList       : [],
        stripedRows         : false,
        showRowHover        : false,
        deselectOnClickaway : true,
        numberOfRows        : 10,
        page                : 1,
        total               : 1
    }

    componentWillMount() {
        const { data, totalCountItems } = this.props;

        this.setState({
            shipmentsList : data,
            total         : totalCountItems
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                shipmentsList : nextProps.data,
                total         : nextProps.totalCountItems
            });
        }
    }

    handleRefresh() {
        const { page } = this.state;

        this.props.onLoadMore(page);
    }

    handleOpenModal(currentItem) {
        this.props.onOpenModal(currentItem);
    }

    // calcTotalCost = (products) => {
    //     const result = products.reduce((summ, current) => {
    //         return summ + current.cost;
    //     }, 0);

    //     return result;
    // }

    itemsSort = (prevItem, nextItem) => {
        if (prevItem.createdAt < nextItem.createdAt) return 1;
        if (prevItem.createdAt > nextItem.createdAt) return -1;

        return 0;
    }

    cardHederComponent() {
        return (
            <div className = 'shipment-list__header'>
                <div className = 'shipment-list__title'>Отгрузы для менеджеров</div>
                <FlatButton
                    label='Обновить'
                    primary
                    onClick = {this.handleRefresh.bind(this)}
                    icon={<RefreshIcon  />}
                />
            </div>
        );
    }

    updateRows(state) {
        const { page } = state;

        this.props.onLoadMore(state.page);
        this.setState({ page });
    }

    render() {
        const { shipmentsList } = this.state;
        const headerComponent = this.cardHederComponent();

        return (
            <Table
                selectable={false}
                wrapperStyle = {style.ShipmentsGridStyles.tableWrapper}
            >
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn
                            colSpan= '10'
                        >
                            {headerComponent}
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn colSpan = '1'><div className = 'shipment-list-header-titles'>Тип</div></TableHeaderColumn>
                        <TableHeaderColumn colSpan = '3'><div className = 'shipment-list-header-titles'>Имя менеджера</div></TableHeaderColumn>
                        <TableHeaderColumn colSpan = '3'><div className = 'shipment-list-header-titles'>Дата</div></TableHeaderColumn>
                        <TableHeaderColumn colSpan = '3'><div className = 'shipment-list-header-titles'>Подробнее</div></TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    deselectOnClickaway={this.state.deselectOnClickaway}
                    showRowHover={this.state.showRowHover}
                    stripedRows={this.state.stripedRows}
                >
                    {shipmentsList.map((row) => {
                        const isTook = row.type === 'TOOK';
                        const itemColor = isTook ? 'rgb(221, 255, 221)' : 'rgb(255, 221, 221)';

                        return (
                            <TableRow key={row.id} style = {{ backgroundColor: itemColor }} >
                                <TableRowColumn  colSpan = '1'> {isTook ? 'Менеджеру' : 'На склад'} </TableRowColumn>
                                <TableRowColumn  colSpan = '3' >
                                    <FullNameField
                                        record ={{
                                            imageUrl   : row.driver.imageUrl,
                                            secondName : row.driver.secondName
                                        }}
                                        withoutStatus
                                    />
                                </TableRowColumn>
                                <TableRowColumn  colSpan = '3' >{Moment(row.createdAt).format('LLLL')}</TableRowColumn>
                                <TableRowColumn  colSpan = '3' >
                                    <Button
                                        label = 'Подробности'
                                        onClick = {this.handleOpenModal.bind(this, row)}
                                    />
                                </TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter
                    adjustForCheckbox={this.state.showCheckboxes}
                    className = 'shipment-list__footer'
                >
                    <TableRow>
                        <Pagination
                            total={this.state.total}
                            rowsPerPage={10}
                            page={this.state.page}
                            numberOfRows={this.state.numberOfRows}
                            updateRows={this.updateRows.bind(this)}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }
}

export default ShipmentsTable;
