import React, { Component }  from 'react';
import {
    SimpleForm,
    TextInput,
    SelectInput
} from 'admin-on-rest';
import PropTypes              from 'prop-types';
import { Field } from 'redux-form';
import UploadImagesBlock               from '../UploadImagesBlock';
import { defaultProductPhoto, apiUrl, productTypes } from '../../etc/config.json';
import styles                          from './styles';
import RenderTextField from  './FractionalInput';

class ProductCreateForm extends Component {
    static propTypes = {
        translate          : PropTypes.any.isRequired,
        record             : PropTypes.any.isRequired,
        onValidateProducts : PropTypes.any.isRequired,
        isEditForm         : PropTypes.any.isRequired
    }

    state ={
        isProduct : false,
        loaded    : false
    }

    componentWillReceiveProps() {
        const { record } = this.props;
        const { loaded } = this.state;

        if (record.type === 'OTHER_PRODUCT' && !loaded) this.setState({ isProduct: true, loaded: true });
    }

    normalizeCapacity = (value) => {
        const isProduct = value === 'OTHER_PRODUCT';

        this.setState({ isProduct });

        return value;
    }


    render() {
        const { translate, record, onValidateProducts, isEditForm } = this.props;  //eslint-disable-line
        const { isProduct } = this.state;
        const productStyles = styles.product.editForm;
        const { inputsErrorStyle } = styles;
        const defaultValuesForm = {};

        if (!isEditForm) {
            defaultValuesForm.image = defaultProductPhoto.split('/images/')[1];
            defaultValuesForm.type = 'WATER';
        }

        return (
            <SimpleForm
                {...this.props}
                validate = {onValidateProducts}
                redirect = 'list'
                defaultValue = {defaultValuesForm}
            >
                <UploadImagesBlock
                    source = 'image'
                    translate  = {translate}
                    imagePreviewUrl = {record.imageUrl  || defaultProductPhoto}
                    apiUrl = {apiUrl}
                    formType = 'Product'
                />
                <TextInput
                    source='name'
                    label='resources.products.create.title'
                    style={productStyles.sizeInput}
                    options={inputsErrorStyle}
                />
                {
                    !isProduct &&
                    <Field
                        name = 'capacity'
                        style={productStyles.sizeInput}
                        elStyle = {productStyles.inputsWidth}
                        label='Объем, л'
                        options={inputsErrorStyle}
                        {...this.props}
                        component = {RenderTextField}
                    />
                }
                <SelectInput
                    source='type'
                    choices={productTypes}
                    optionText='label'
                    label='resources.products.type'
                    normalize = {this.normalizeCapacity}
                    optionValue = 'value'
                    defaultValue = 'WATER'
                    style={productStyles.dropdownInput}
                />
                <Field
                    name = 'cost'
                    style={productStyles.priseInput}
                    elStyle = {productStyles.inputsWidth}
                    label='Цена'
                    options={inputsErrorStyle}
                    {...this.props}
                    component = {RenderTextField}
                />
                <TextInput
                    source='description'
                    label = 'resources.products.tabs.description'
                    options={{ ...inputsErrorStyle, fullWidth: true, multiLine: true }}
                    style = {{ maxWidth: 1092 }}
                />
            </SimpleForm>
        );
    }
}

export default ProductCreateForm;
