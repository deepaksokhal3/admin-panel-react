import React, { Component } from 'react';
import { Admin, Resource }  from 'admin-on-rest';
import './registerValidationRules.js';

// import icons
import UserIcon     from 'material-ui/svg-icons/social/group';
import ShopIcon     from 'material-ui/svg-icons/action/shopping-cart';
import ShipmentIco  from 'material-ui/svg-icons/action/add-shopping-cart';
import MapIcon      from 'material-ui/svg-icons/maps/place';
import OrderIcon    from 'material-ui/svg-icons/editor/attach-money';
import ProviderIcon from 'material-ui/svg-icons/places/business-center';
import StatIco      from 'material-ui/svg-icons/editor/insert-chart';
import GPSIcon      from 'material-ui/svg-icons/device/gps-fixed';


// import components
import LoginForm        from './components/login/LoginForm.jsx';
import StatPage         from './components/StatPage';
import UserUpdate       from './components/users/UserUpdate';
import UsersList        from './components/users/UsersList';
import UserCreate       from './components/users/UserCreate';
import usersSaga        from './components/users/usersSaga';
import usersReducer     from './components/users/usersReducer';

import ProductDelete    from './components/products/ProductDelete';
import ProductsList     from './components/products/ProductsList';
import ProductCreate    from './components/products/ProductCreate';
import ProductUpdate    from './components/products/ProductUpdate';

import Map              from './components/map/MapContainer';

import ShipmentsList    from './components/shipments/ShipmentsList';
import shipmentsReducer from './components/shipments/shipmentsReducer';
import shipmentSaga     from    './components/shipments/shipmentSaga';

import ProvidersList    from './components/providers/ProvidersList';
import ProviderUpdate   from './components/providers/ProviderUpdate';
import ProviderDelete   from './components/providers/ProviderDelete';
import ProviderCreate   from './components/providers/ProviderCreate';
import ProviderGeoSettingsForm from './components/providers/ProviderGeoSettingsForm';
import providersReducer from './components/providers/providersReducer';

import AdminsList       from './components/providerAdmin/AdminsList';
import UpdateAdmin      from './components/providerAdmin/AdminUpdate';
import AdminDelete    from './components/providerAdmin/AdminDelete';

import OrdersList       from './components/orders/OrdersList';
import OrderCreate      from './components/orders/OrderCreate';
import orderSaga        from './components/orders/orderSaga';
import ordersReducer    from './components/orders/ordersReducer';
import nominatimReducer from './NominatimReducer';
import coinSaga         from './components/coins/coinSaga';
import coinReducer      from './components/coins/coinReducer';

import translations     from './i18n';
import customRoutes     from './customRoutes';

// import APIs
import authClient                                 from './api/authClient.js';
import restApi                                    from './api/restApi.js';
import { apiUrl }                                 from './etc/config.json';
import resetReduser from './components/confirm-password/resetReduser.js';
import resetSaga    from './components/confirm-password/resetSaga.js';
import CustomLayout from './components/CustomLayout';

class App extends Component {
    render() {
        return (
            <Admin
                loginPage={LoginForm}
                customRoutes={customRoutes}
                authClient={authClient}
                restClient={restApi(apiUrl)}
                messages={translations}
                customReducers={{
                    shipmentState      : shipmentsReducer,
                    usersState         : usersReducer,
                    resetPasswordState : resetReduser,
                    providersState     : providersReducer,
                    coinState          : coinReducer,
                    ordersState        : ordersReducer,
                    nominatimState     : nominatimReducer
                }}
                appLayout={CustomLayout}
                locale='ru'
                title = ''
                customSagas={[ shipmentSaga, usersSaga, orderSaga, resetSaga, coinSaga ]}
            >
                {
                    permissions => {
                        if (permissions === 'PROVIDER_ADMIN') {
                            return [
                                <Resource
                                    name='products'
                                    list={ProductsList}
                                    edit ={ProductUpdate}
                                    create={ProductCreate}
                                    remove = {ProductDelete}
                                    icon={ShopIcon}
                                    key = 'products'
                                />,
                                <Resource
                                    name='users'
                                    options={{ label: 'resources.drivers.name' }}
                                    list={UsersList}
                                    edit ={UserUpdate}
                                    create={UserCreate}
                                    icon={UserIcon}
                                    key = 'users'
                                />,
                                <Resource
                                    name='shipments'
                                    options={{ label: 'Отгрузы' }}
                                    list={ShipmentsList}
                                    icon={ShipmentIco}
                                    key = 'shipments'
                                />,
                                <Resource
                                    list = {OrdersList}
                                    options={{ label: 'Заказы' }}
                                    create={OrderCreate}
                                    name='orders'
                                    key = 'orders'
                                    icon = {OrderIcon}
                                />,
                                <Resource
                                    icon={MapIcon}
                                    list={Map}
                                    options={{ label: 'Карта' }}
                                    name='map'
                                    key = 'map'
                                />,
                                <Resource
                                    name='geosettings'
                                    list = {ProviderGeoSettingsForm}
                                    options = {{ label: 'Зона покрытия' }}
                                    icon={GPSIcon}
                                    key = 'geosettings'
                                />
                            ];
                        } else if (permissions === 'ADMIN') {
                            return [
                                <Resource
                                    name='providers'
                                    list={ProvidersList}
                                    edit = {ProviderUpdate}
                                    options = {{ label: 'resources.providers' }}
                                    icon={ProviderIcon}
                                    remove = {ProviderDelete}
                                    create ={ProviderCreate}
                                    key = 'providers'
                                />,
                                <Resource
                                    name='users'
                                    list={AdminsList}
                                    options = {{ label: 'resources.admins' }}
                                    icon={UserIcon}
                                    remove = {AdminDelete}
                                    edit = {UpdateAdmin}
                                    key = 'admins'
                                />,
                                <Resource
                                    name='statistic'
                                    icon={StatIco}
                                    list = {StatPage}
                                    key = 'statistic'
                                    options = {{ label: 'resources.stat' }}
                                />
                            ];
                        }
                        const serchParams = new URLSearchParams(document.location.hash);
                        const type = serchParams.get('type');

                        if (!type) document.location.replace('/#/login');

                        return;
                    }
                }
            </Admin>
        );
    }
}

export default App;
