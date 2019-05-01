import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'admin-on-rest';
import restApi    from '../api/restApi';
import { MaxUploadSize, SizeCoeficient } from '../etc/config.json';

import styles     from './styles';
import './style.css';

class UploadDocumentsBlock extends Component {
    static propTypes = {
        apiUrl    : PropTypes.string,
        translate : PropTypes.func,
        meta      : PropTypes.object // eslint-disable-line
    }

    static defaultProps = {
        addField  : true, // eslint-disable-line
        translate : () => {},
        apiUrl    : ''
    }

    state = {
        error    : '',
        fileName : ''
    }

    componentWillReceiveProps(nextProps) {
        const { meta } = this.props;

        if (meta !== nextProps.meta) {
            const nextPropsError = nextProps.meta.error;

            if (nextPropsError) {
                this.setState({ error: nextProps.meta.error });
            } else {
                this.setState({ error: '' });
            }
        }
    }

    async handleUploadFile(file) {
        const { apiUrl } = this.props;
        const req =  restApi(apiUrl);

        try {
            const  { data }  = await req('CREATE', 'files/documents', { data: { document: file } });

            this.props.input.onChange(data.remoteFileName || 'e' );  // eslint-disable-line
        } catch (error) {
            console.warn('Error', error);
        }
    }

    onChange(e) {
        const reader = new FileReader();
        const file = e.target.files[0];
        const maxFileSize = file.size && file.size / SizeCoeficient < (MaxUploadSize);

        if (file && (file.type.match(/pdf/) || file.type.match(/image.*/)) && maxFileSize) {
            this.setState({ error: '' });
            reader.onloadend = () => {
                this.setState({
                    fileName : file.name
                });
                this.handleUploadFile(file);
            };

            reader.readAsDataURL(file);
        } else {
            const error = maxFileSize ? 'Пожалуйста используйте документ в формате PDF, png, или jpg' : `Максимальный размер ${MaxUploadSize} Мб.`;

            this.setState({ error });

            return;
        }
    }

    render() {
        const {
            translate // eslint-disable-line
        } = this.props;
        const { error } = this.state;
        const { errorStyle, inputFile, fileContainer } = styles;

        return (
            <div className = 'DocumentBlockWrapper' >
                <b> {this.state.fileName} </b>
                <label style={fileContainer} >
                    {translate('resources.drivers.create.document')}
                    <input
                        type = 'file'
                        onChange = {(e) => this.onChange(e)} // eslint-disable-line
                        style = {inputFile}
                    />
                </label>
                { error ?  <span style={errorStyle}>{error}</span>  : <div /> }
            </div>
        );
    }
}

export default translate(UploadDocumentsBlock);
