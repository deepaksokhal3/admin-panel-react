import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class Modal extends Component {
    static propTypes = {
        title                 : PropTypes.string,
        isOpen                : PropTypes.bool,
        onClose               : PropTypes.func,
        onSubmit              : PropTypes.func,
        type                  : PropTypes.string,
        children              : PropTypes.object,
        closeButtonLabel      : PropTypes.string,
        submitButtonLabel     : PropTypes.string,
        autoScrollBodyContent : PropTypes.bool,
        contentStyle          : PropTypes.object,
        isDisabledSubmit      : PropTypes.bool
    };

    static defaultProps = {
        title                 : '',
        type                  : 'SUBMIT',
        isOpen                : false,
        onClose               : () => {},
        onSubmit              : () => {},
        children              : {},
        contentStyle          : {},
        isDisabledSubmit      : false,
        closeButtonLabel      : 'Закрыть',
        submitButtonLabel     : 'Отправить',
        autoScrollBodyContent : false
    }

    // componentWillMount() {
    //     const { type, closeButtonLabel, submitButtonLabel, isDisabledSubmit } = this.props;

    //     this.setState({
    //         actionsButtons : type === 'SUBMIT' ? [
    //             <FlatButton
    //                 label= {closeButtonLabel}
    //                 primary
    //                 onClick={this.handleClose}
    //                 key = '1'
    //             />,
    //             <FlatButton
    //                 label= {submitButtonLabel}
    //                 primary
    //                 disabled = {isDisabledSubmit}
    //                 onClick={this.handleSubmit}
    //                 key = '2'
    //             />
    //         ] : [
    //             <FlatButton
    //                 label= {closeButtonLabel}
    //                 primary
    //                 onClick={this.handleClose}
    //                 key = '1'
    //             />
    //         ]
    //     });
    // }

    handleClose = () => {
        this.props.onClose();
    }

    handleSubmit = () => {
        this.props.onSubmit();
    }

    render() {
        const {
            title,
            isOpen,
            autoScrollBodyContent,
            type,
            closeButtonLabel,
            submitButtonLabel,
            isDisabledSubmit,
            contentStyle
        } = this.props;

        const actionsButtons = type === 'SUBMIT' ? [
            <FlatButton
                label= {closeButtonLabel}
                primary
                onClick={this.handleClose}
                key = '1'
            />,
            <FlatButton
                label= {submitButtonLabel}
                primary
                disabled = {isDisabledSubmit}
                onClick={this.handleSubmit}
                key = '2'
            />
        ] : [
            <FlatButton
                label= {closeButtonLabel}
                primary
                onClick={this.handleClose}
                key = '1'
            />
        ];

        return (
            <Dialog
                title= {title}
                actions={actionsButtons}
                modal={false}
                open={isOpen}
                onRequestClose={this.handleClose}
                autoScrollBodyContent = {autoScrollBodyContent}
                autoDetectWindowHeight
                contentStyle = {contentStyle}
            >
                { this.props.children }
            </Dialog>
        );
    }
}
