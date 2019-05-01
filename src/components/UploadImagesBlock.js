import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'admin-on-rest';
import restApi    from '../api/restApi';
import { MaxUploadSize, SizeCoeficient, defaultRemovedImg } from '../etc/config.json';
import PreviewImg from './PreviewImg';
import './style.css';

class UploadImagesBlock extends Component {
    static propTypes = {
        imagePreviewUrl  : PropTypes.string,
        onChangeImageUrl : PropTypes.func,
        source           : PropTypes.string,
        apiUrl           : PropTypes.string,
        translate        : PropTypes.func,
        isRemoveImage    : PropTypes.bool,
        formType         : PropTypes.string
    }

    static defaultProps = {
        imagePreviewUrl  : '',
        source           : '',
        addField         : true, // eslint-disable-line
        translate        : () => {},
        onChangeImageUrl : () => {},
        apiUrl           : '',
        isRemoveImage    : false,
        formType         : ''
    }

    state = {
        imagePreviewUrl : this.props.imagePreviewUrl,
        error           : ''
    }

    async handleUploadPhoto(file) {
        const { apiUrl, source } = this.props;
        const req =  restApi(apiUrl);

        try {
            const  { data }  = await req('CREATE', 'files/images', { data: { image: file } });

            this.props.input &&  this.props.input.onChange(data.remoteFileName || null );  // eslint-disable-line
            this.props.onChangeImageUrl(source ,data.remoteFileName || null );  // eslint-disable-line
        } catch (error) {
            console.warn('Error', error);
        }
    }

    handleRemoveImage = () => {
        const { source, onChangeImageUrl } = this.props;

        this.setState({
            imagePreviewUrl : defaultRemovedImg
        });
        this.props.input &&  this.props.input.onChange( null );  // eslint-disable-line
        onChangeImageUrl(source ,  null );  // eslint-disable-line
    }

    onChangeLogo(e) {
        const reader = new FileReader();
        const file = e.target.files[0];
        const maxFileSize =  file.size && file.size / SizeCoeficient < (MaxUploadSize);

        if (file && file.type.match(/image.*/) && !file.type.match(/application.*/) && maxFileSize) {
            this.setState({ error: '' });
            reader.onloadend = () => {
                this.setState({
                    imagePreviewUrl : reader.result
                });
                this.handleUploadPhoto(file);
            };

            reader.readAsDataURL(file);
        } else {
            const error = maxFileSize ? 'Разрешено только картинки' : `Максимальный размер ${MaxUploadSize} Мб.`;

            this.setState({ error });

            return;
        }
    }


    render() {
        const {
            isRemoveImage,
            translate, // eslint-disable-line
            formType
        } = this.props;
        const { error } = this.state;

        const size = formType === 'Product' ? '300:300' : formType === 'Provider' ? '440х130' : '160: 160'; // eslint-disable-line

        return (
            <div>
                <div className = 'UploadImg__wrapper'>
                    <div className = 'ImgWrapper'>
                        <PreviewImg
                            imgUrl = {this.state.imagePreviewUrl || null}
                            onRemove = {this.handleRemoveImage}
                            isRemove = {isRemoveImage}
                        />
                    </div>
                    <div className = 'file_upload' >
                        <button type='button'>{translate('resources.products.tabs.image')}</button>
                        <input
                            type = 'file'
                            onChange = {(e) => this.onChangeLogo(e)} // eslint-disable-line
                        />
                    </div>
                </div>
                { error ? <span className='UploadError'>{error}</span> : <span className = 'imgHint'> Рекомендуемый размер фото: {size} px</span> }
            </div>
        );
    }
}

export default translate(UploadImagesBlock);
