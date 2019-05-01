import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import DatePicker           from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Moment from 'moment';
import './styles.css';

class OrderReportModalBody extends Component {
    static propTypes = {
        onDownloadReport : PropTypes.func.isRequired,
        errMsg           : PropTypes.string,
        isLoading        : PropTypes.bool
    }
    static defaultProps = {
        errMsg    : '',
        isLoading : false
    }

    state = {
        startDate : '',
        endDate   : '',
        errMsg    : ''
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.errMsg !== nextProps.errMsg)  this.setState({ errMsg: nextProps.errMsg });
    }
    handleChangeStartDate = (e, startDate) =>  this.setState({ startDate, errMsg: '' });
    handleChangeEndDate = (e, endDate) =>  this.setState({ endDate, errMsg: '' });

    handleOnClick = () => {
        const { onDownloadReport } = this.props;
        const { startDate, endDate } = this.state;
        const sDate = Moment(startDate).toISOString();
        const eDate = Moment(endDate).add('24', 'hours').toISOString();

        const result = `${sDate},${eDate}`;

        onDownloadReport(result);
    }

    render() {
        const { errMsg } = this.state;
        const { isLoading } = this.props;

        return (
            <div className = 'OrderReport__wrapper'>
                <div className = 'OrderReport__dates'>
                    <DatePicker
                        floatingLabelText='Начало периода'
                        autoOk
                        cancelLabel = 'Закрыть'
                        DateTimeFormat = {Intl.DateTimeFormat}
                        locale = 'ru'
                        onChange={this.handleChangeStartDate}
                    />
                    <DatePicker
                        floatingLabelText='Конец периода'
                        autoOk
                        cancelLabel = 'Закрыть'
                        DateTimeFormat = {Intl.DateTimeFormat}
                        locale = 'ru'
                        onChange={this.handleChangeEndDate}
                    />
                </div>
                <div className = 'OrderReport__button'>
                    <RaisedButton primary  label = 'Скачать отчет' onClick = {this.handleOnClick} />
                </div>
                <span className = 'OrderReport__msg_error' > {errMsg ? errMsg : ''} </span>
                <span className = 'OrderReport__msg' > {isLoading ? 'Идет загрузка отчета...' : ''} </span>
            </div>
        );
    }
}

export default OrderReportModalBody;
