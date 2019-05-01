import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { EditButton } from 'admin-on-rest';
import { List } from 'material-ui/List';
import './styles.css';
import ScrollButton from '../ScrollButton';
import { chooseType } from '../../utils';

class GridList extends Component {
    static propTypes = {
        ids      : PropTypes.array.isRequired,
        data     : PropTypes.object.isRequired,
        basePath : PropTypes.string.isRequired
    }

    listItem(data, id, basePath) {
        const { name, capacity, cost, description, imageUrl, type } = data[id];

        return (
            <div key = {id} className = 'productList-item' >
                {this.imageBlock(imageUrl)}
                <div className = 'productList-item__rightBlock'>
                    {this.descriptionBlock(capacity, cost, description, name, type)}
                    <div className = 'product-item__editBtn'> <EditButton basePath={basePath} record={data[id]} label='' /> </div>
                </div>
            </div>
        );
    }

    imageBlock(imageUrl) {
        return (
            <div className ='productList-item__image-block'>
                <div className = 'productList-item__div-image'>
                    <img src={imageUrl} className= 'productList-item__image' />
                </div>
            </div>
        );
    }

    descriptionBlock(capacity, cost, description, name, type) {
        return (
            <div className = 'productList-item__description-block' >
                <div className = 'productList-item__description__wraper'>
                    <div className = 'productList-item-description-label'>Название: </div>
                    <div className = 'productList-item-description-content'> {name} </div>
                </div>
                {   type !== 'OTHER_PRODUCT' &&
                    <div className = 'productList-item__description__wraper'>
                        <div className = 'productList-item-description-label'> Объем:  </div>
                        <div className = 'productList-item-description-content'> {capacity / 1000}</div>
                    </div>
                }
                <div className = 'productList-item__description__wraper'>
                    <div className = 'productList-item-description-label'> Стоимость: </div>
                    <div className = 'productList-item-description-content'> {cost / 100} </div>
                </div>
                <div className = 'productList-item__description__wraper'>
                    <div className = 'productList-item-description-label'> Тип: </div>
                    <div className = 'productList-item-description-content'> {chooseType(type)} </div>
                </div>
                <div className = 'productList-item__description__wraper'>
                    <div className = 'productList-item-description-label'> Краткое описание: </div>
                    <div className = 'productList-item-description-content'> {description} </div>
                </div>
            </div>
        );
    }


    render() {
        const { ids, data, basePath } = this.props;

        return (
            <div>
                <List >
                    {ids.map((id) => {
                        return (
                            this.listItem(data, id, basePath)
                        );
                    }
                    )}
                </List>
                <ScrollButton />
            </div>
        );
    }
}

export default GridList;
