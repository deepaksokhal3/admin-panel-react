import React, { Component } from 'react';
import {
    List,
    Datagrid,
    EditButton,
    DateField
} from 'admin-on-rest';
import PropTypes              from 'prop-types';
import {
    DateFieldFormat,
    DefaultSortValue }        from '../../constants';

import PhoneField             from '../PhoneField';
import PureFullNameField      from '../FullNameField';
import SocialBlock            from '../SocialBlock';
import PureCompanyName        from './CompanyName';

class AdminsList extends Component {
    static propTypes = {
        record : PropTypes.object
    };

    static defaultProps = {
        record : {}
    }

    render() {
        const LblName = 'resources.admin.';

        return (
            <div>
                <List
                    title= {`${LblName}page.list`}
                    {...this.props}
                    filter = {{ role: 'PROVIDER_ADMIN', include: 'providers' }}
                    sort={DefaultSortValue}
                >
                    <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
                        <PureFullNameField
                            source = 'firstName'
                            withoutStatus
                        />
                        <PureCompanyName />
                        <PhoneField
                            source = 'phone'
                            label =  {`${LblName}phone`}
                            sortable={false}
                        />
                        <DateField
                            source='createdAt'
                            label ='resources.createdAt'
                            options={DateFieldFormat}
                            locales='ru-RU'
                        />
                        <SocialBlock />
                        <EditButton label = '' />
                    </Datagrid>
                </List>
            </div>
        );
    }
}


export default (AdminsList);
