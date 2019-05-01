import React from 'react';
import RenderFractionalInput from './RenderFractionalInput';

function prepareDefaultValue(input, isEdit) {
    let result = '';

    if (isEdit) {
        result = input.name === 'cost' ? (+input.value / 100).toFixed(2) : (+input.value / 1000).toFixed(2);
    }

    return result;
}

function RenderTextField(props) {
    const {input, label, meta, isEditForm} = props;  //eslint-disable-line

    return (
        <RenderFractionalInput
            {...input}
            onSetValue = {input.onChange}  //eslint-disable-line
            value = {prepareDefaultValue(input, isEditForm)}
            hintText = {label}
            error = {meta.touched && meta.error}
        />
    );
}

export default RenderTextField;
