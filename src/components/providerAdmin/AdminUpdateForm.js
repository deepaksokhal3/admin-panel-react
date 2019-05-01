import React from 'react';
import { TextInput } from 'admin-on-rest';
import { Field } from 'redux-form';
import UploadImagesBlock               from '../UploadImagesBlock';
import { defaultProviderPhoto, apiUrl } from '../../etc/config.json';
import styles                          from '../providers/styles';
import './style.css';

function AdminUpdateForm(props) {
    const { record } = props; //eslint-disable-line
    const { inputsErrorStyle } = styles;

    return (
        <div className='AdminCreateForm'>
            <div className = 'AdminCreateForm__firstBlock'>
                <Field
                    name='avatar'
                    component = {UploadImagesBlock}
                    imagePreviewUrl = {record.imageUrl  || defaultProviderPhoto}
                    apiUrl = {apiUrl}
                    isRemoveImage
                    label='resources.provider.phone'
                    {...props}
                />
                <div className = 'AdminCreateForm__firstBlock-inputs'>
                    <Field
                        name='firstName'
                        component = {TextInput}
                        label='resources.firstName'
                        options={inputsErrorStyle}
                    />
                    <Field
                        name='secondName'
                        component = {TextInput}
                        label='resources.lastName'
                        options={inputsErrorStyle}
                    />
                    <Field
                        name='phone'
                        component = {TextInput}
                        label='resources.admin.phone'
                        options={inputsErrorStyle}
                    />
                    <Field
                        name='email'
                        component = {TextInput}
                        label='resources.provider.email'
                        options={{ ...inputsErrorStyle, hintText: 'admin@mail.ua' }}
                    />
                </div>
            </div>
            <div className = 'AdminCreateForm__secondBlock'>
                <Field
                    name='social.telegram'
                    component = {TextInput}
                    label='resources.admin.telegramId'
                    options={{ ...inputsErrorStyle, hintText: 'telegram_id' }}
                />
                <Field
                    name='social.viber'
                    component = {TextInput}
                    label='resources.admin.viber'
                    options={{ ...inputsErrorStyle }}
                />
            </div>
        </div>
    );
}

export default AdminUpdateForm;
