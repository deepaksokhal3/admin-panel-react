import React, { Component } from 'react';
import PropTypes              from 'prop-types';
import {
    apiUrl,
    defaultDriverPhoto }    from '../../etc/config.json';
import UploadImagesBlock    from '../UploadImagesBlock';
import CustomTextField      from '../CustomTextField';
import './style.css';


class AdminCreateForm extends Component {
    static propTypes = {
        onChangeData : PropTypes.func.isRequired,
        errors       : PropTypes.object
    };

    static defaultProps = {
        errors : {}
    }

    state = {
        avatar     : defaultDriverPhoto.split('/images/')[1],
        firstName  : '',
        secondName : '',
        email      : '',
        password   : '',
        phone      : '',
        social     : {},
        role       : 'PROVIDER_ADMIN'
    }

    handleChange = (name, value) => {
        if (name === 'telegram') {
            this.setState({ social: { telegram: value } }, () => {
                this.props.onChangeData(this.state);
            });

            return;
        }
        if (name === 'viber') {
            this.setState({ social: { viber: value } }, () => {
                this.props.onChangeData(this.state);
            });

            return;
        }
        this.setState({
            [name] : value
        }, () => {
            this.props.onChangeData(this.state);
        });
    }

    render() {
        const { errors } = this.props;

        return (
            <div className='AdminCreateForm'>
                <div className = 'AdminCreateForm__firstBlock'>
                    <UploadImagesBlock
                        source = 'avatar'
                        imagePreviewUrl = {defaultDriverPhoto}
                        apiUrl = {apiUrl}
                        onChangeImageUrl = {this.handleChange}
                    />
                    <div className = 'AdminCreateForm__firstBlock-inputs'>
                        <CustomTextField
                            name = 'firstName'
                            floatingLabelText = 'Имя пользователя'
                            onSetValue = {this.handleChange}
                            error = {errors.firstName}
                        />
                        <CustomTextField
                            name = 'secondName'
                            floatingLabelText = 'Фамилия'
                            error = {errors.secondName}
                            onSetValue = {this.handleChange}
                        />
                        <CustomTextField
                            name = 'phone'
                            error = {errors.phone}
                            floatingLabelText = 'Номер телефона'
                            onSetValue = {this.handleChange}
                        />
                        <CustomTextField
                            name = 'email'
                            hintText = 'admin@mail.ua'
                            floatingLabelText = 'Электронная почта'
                            onSetValue = {this.handleChange}
                            error = {errors.email}
                        />
                    </div>
                </div>
                <div className = 'AdminCreateForm__secondBlock'>
                    <CustomTextField
                        name = 'telegram'
                        hintText = 'telegram_id'
                        floatingLabelText = 'Телеграм ID'
                        error = {errors.social}
                        onSetValue = {this.handleChange}
                    />
                    <CustomTextField
                        name = 'viber'
                        floatingLabelText = 'Viber'
                        error = {errors.social}
                        onSetValue = {this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

export default AdminCreateForm;
