import React from 'react';
import { translate } from 'admin-on-rest';

const ActionsTitle = translate((props) => {
    const { record, actionName, translate } = props; //eslint-disable-line

    return (
        <span>
            {translate(`resources.products.page.${actionName}`)}&nbsp;
            {record && `"${record.name}"`}
        </span>
    );
}
);

export default ActionsTitle;
