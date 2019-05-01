/*eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import IconButton from 'material-ui/IconButton';

import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import styles from './inlineStyles';

class Pagination extends Component {
    constructor(props, context) {
        super(props, context);

        this.selectRowsPerPage = this.selectRowsPerPage.bind(this);
        this.selectPageNumber = this.selectPageNumber.bind(this);

        this.renderRowRange = this.renderRowRange.bind(this);

        this.numberOfPages = this.numberOfPages.bind(this);

        this.incrementPage = this.incrementPage.bind(this);
        this.decrementPage = this.decrementPage.bind(this);
    }

    selectPageNumber(e) {
        const updatedState =  Object.assign({}, this.props);

        updatedState.page = parseInt(e.target.innerText, 10);
        this.props.updateRows(updatedState);
    }

    selectRowsPerPage(e) {
        const updatedState =  Object.assign({}, this.props);

        updatedState.numberOfRows = parseInt(e.target.innerText, 10);
        if (updatedState.numberOfRows * this.props.page > this.props.total) {
            const updatedPage = Math.ceil(this.props.total / updatedState.numberOfRows, 10);

            updatedState.page = updatedPage;
            this.props.updateRows(updatedState);
        } else {
            this.props.updateRows(updatedState);
        }
    }

    numberOfPages() {
        const numArray = [];

        for(let i = 0; i < Math.ceil(this.props.total/this.props.numberOfRows); i++){
            numArray.push(i+1);
        }

        return numArray.map((pageValue, index) => {
            return (
                <MenuItem key={index} value={pageValue} primaryText={pageValue} />
            );
        });
    }

    incrementPage() {
        const updatedState = Object.assign({}, this.props);   

        updatedState.page++;
        this.props.updateRows(updatedState);
    }

    decrementPage() {
        const updatedState = Object.assign({}, this.props);

        updatedState.page--;
        this.props.updateRows(updatedState);
    }

    renderRowRange() {
        const { numberOfRows, page, total } = this.props;

        return (
            <span>
                {numberOfRows * this.props.page - numberOfRows + 1} - {numberOfRows * page < total ? numberOfRows * page : total}
            </span>
        );
    }

    render() {
        const { pageTitle, prepositionForRowRange, total, page, numberOfRows } = this.props;
        
        return total ? (
            <div style={styles.paginationContainer}>
                <div style={styles.paginationSection}>
                    <div style={styles.paginationText}>
                        {pageTitle}
                    </div>
                    <SelectField
                        style={styles.paginationSelect}
                        value={page}
                        maxHeight = {200}
                        onChange = {this.selectPageNumber}
                    >
                        {total === 1 ? null : this.numberOfPages()}
                    </SelectField>
                </div>

                <div style={styles.paginationSection}>
                    <div style={styles.paginationText}>
                        {this.renderRowRange()} {prepositionForRowRange} {total}
                    </div>
                </div>

                <div style={styles.paginationSection}>
                    <IconButton
                        iconStyle={page <= 1 ?  styles.navigationLeftFirstPage : styles.navigationLeft}
                        name= 'navigationLeft'
                        disabled={page <= 1}
                        onClick ={this.decrementPage}>
                        <ChevronLeft />
                    </IconButton>
                    <IconButton
                        iconStyle={page >= total / numberOfRows ? styles.navigationRightLastPage: styles.navigationRight}
                        name='navigationRight'
                        disabled= {page >= total / numberOfRows}
                        onClick = {this.incrementPage}>
                        <ChevronRight />
                    </IconButton>
                </div>
            </div>
        ) : (
            <div className = 'ShipmentTable__notFound' >Результатов не найдено</div>
        );
    }
}

Pagination.defaultProps = {
    total                  : 0,
    page                   : 1,
    numberOfRows           : 10,
    pageTitle              : 'Страница:',
    prepositionForRowRange : 'из',
    updateRows             : () => {}
};

Pagination.propTypes = {
    total                  : PropTypes.number,
    page                   : PropTypes.number,
    numberOfRows           : PropTypes.number,
    updateRows             : PropTypes.func,
    pageTitle              : PropTypes.string,
    prepositionForRowRange : PropTypes.string
};

export default Pagination;
