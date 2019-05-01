import React from 'react';
import {
    TextInput,
    RadioButtonGroupInput
} from 'admin-on-rest';
import { Field } from 'redux-form';

import UploadImagesBlock    from '../UploadImagesBlock';
import UploadDocumentsBlock from '../UploadDocs';

import {
    apiUrl,
    defaultDriverPhoto,
    userStatuses
}                         from '../../etc/config.json';
import styles             from './styles';
import ResetPasswordBtn   from './ResetPassBtn';
import './style.css';

function UserCreateForm(props) {
    const { record, isEditForm } = props; //eslint-disable-line
    const { inputsErrorStyle, createUser } = styles;

    return (
        <div className = 'UserCreateForm__wrapper'>
            <div className = 'UserCreateForm__firsRow'>
                <Field
                    name='avatar'
                    component = {UploadImagesBlock}
                    imagePreviewUrl = {record.imageUrl  || defaultDriverPhoto}
                    apiUrl = {apiUrl}
                    isRemoveImage = {isEditForm}
                    label='resources.provider.phone'
                    {...props}
                />
                <div>
                    <div className = 'UserCreateForm__names'>
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
                    </div>
                    <div className = 'UserCreateForm__names'>
                        <Field
                            name='phone'
                            component = {TextInput}
                            label='resources.drivers.create.phone'
                            options={{ ...inputsErrorStyle }}
                        />
                        <Field
                            name='email'
                            label='Email'
                            component = {TextInput}
                            options={{ ...inputsErrorStyle, hintText: 'driver@mail.ua' }}
                        />
                    </div>
                    <div className = 'UserCreateForm__names'>
                        <Field
                            name='social.telegram'
                            component = {TextInput}
                            label='resources.admin.telegramId'
                            options={{ ...inputsErrorStyle, hintText: 'user_id', autoComplete: 'false' }}
                        />
                        <Field
                            name='social.viber'
                            component = {TextInput}
                            label='resources.admin.viber'
                            options={{ ...inputsErrorStyle }}
                        />
                    </div>
                    <div className = 'UserCreateForm__names'>
                        <Field
                            name='tin'
                            component = {TextInput}
                            label='resources.drivers.create.tin'
                            options={{ ...inputsErrorStyle, autoComplete: 'false' }}
                        />
                        <Field
                            name='document'
                            component = {UploadDocumentsBlock}
                            apiUrl = {apiUrl}
                            {...props}
                        />
                    </div>
                </div>
            </div>
            <div className = 'UserCreateForm__secondRow'>
                {
                    !isEditForm ?
                        <Field
                            name='password'
                            component = {TextInput}
                            options={{ ...inputsErrorStyle, ...createUser.passInputStyles }}
                            type = 'text'
                            label = 'resources.drivers.create.password'
                        />
                        : null
                }
                { isEditForm ?
                    <Field
                        name='resetPasswordBtn'
                        component = {ResetPasswordBtn}
                        {...props}
                    /> : <div />
                }
                { isEditForm ?
                    <div >
                        <Field
                            name='status'
                            choices={userStatuses}
                            optionText='status'
                            optionValue = 'value'
                            component = {RadioButtonGroupInput}
                            label='resources.drivers.fields.status'
                        />
                    </div> : <div />
                }

            </div>
            <div className = 'UserCreateForm__carInfo'>
                <Field
                    name='carModel'
                    component = {TextInput}
                    label='resources.drivers.create.car.brand'
                    options={inputsErrorStyle}
                />
                <Field
                    name='carNumber'
                    component = {TextInput}
                    label='resources.drivers.create.car.number'
                    options={inputsErrorStyle}
                />
                <Field
                    name='carOwner'
                    component = {TextInput}
                    label='resources.drivers.create.car.owner'
                    options={inputsErrorStyle}
                />
            </div>
            <Field
                name='address'
                component = {TextInput}
                label='resources.drivers.create.address'
                options={{ ...inputsErrorStyle, fullWidth: true }}
            />
        </div>
    );
}

export default UserCreateForm;

