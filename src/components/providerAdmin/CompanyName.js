import React       from 'react';
import pure        from 'recompose/pure';
import PropTypes   from 'prop-types';

function CompanyName({ record = {} }) {
    return <span style={{ display: 'inline-block' }}>{record.provider && record.provider.name}</span>;
}


const PureCompanyName = pure(CompanyName);

CompanyName.propTypes = {
    record : PropTypes.arrayOf(PropTypes.object).isRequired
};

PureCompanyName.defaultProps = {
    label : 'resources.provider.name'
};

export default PureCompanyName;
