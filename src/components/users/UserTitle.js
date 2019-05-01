import React from 'react';
import { translate } from 'admin-on-rest';

const UserTitle = translate((props) => {
    const { record, actionName, translate } = props; //eslint-disable-line

    return (
        <span>
            {translate(`resources.drivers.page.${actionName}`)}&nbsp;
            {record && <b>{record.firstName} {record.secondName}</b>}
        </span>
    );
}
);

export default UserTitle;
