import React from 'react';
import { translate } from 'admin-on-rest';

let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; //eslint-disable-line

const UserTitle = translate((props) => {
    const { record, actionName, translate } = props; //eslint-disable-line

    return (
        <span className = 'ProviderUpdate--title'>
            {translate(`resources.provider.page.${actionName}`)}&nbsp;
            {record && width > 770 &&  <b>{`"${record.name}"`}</b>}
        </span>
    );
}
);

export default UserTitle;
