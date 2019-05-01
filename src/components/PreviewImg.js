import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Card, CardMedia } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClose         from 'material-ui/svg-icons/navigation/close';
import './style.css';

class PreviewImg extends Component {
    static propTypes = {
        imgUrl   : PropTypes.string.isRequired,
        onRemove : PropTypes.func.isRequired,
        isRemove : PropTypes.bool
    }

    static defaultProps = {
        isRemove : false
    }

    handleOnRemoveItem = () => {
        this.props.onRemove();
    }
    render() {
        const { imgUrl, isRemove } = this.props;

        return (
            <Card zDepth={2} style={{ display: 'inline-block', marginTop: '1em', position: 'relative' }}>
                {
                    isRemove ?
                        <FloatingActionButton
                            type = 'button'
                            mini
                            className = 'remove_btn'
                            secondary
                            style = {{ position: 'absolute', zIndex: 100 }}
                            onClick = {this.handleOnRemoveItem}
                        >
                            <ContentClose className = 'removeItemIconStyle' />
                        </FloatingActionButton>
                        : null
                }
                <CardMedia style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={imgUrl} alt='' style={{ width: 'initial', minWidth: 'initial', maxWidth: '10em', maxHeight: '11em' }} />
                </CardMedia>
            </Card>
        );
    }
}

export default PreviewImg;
