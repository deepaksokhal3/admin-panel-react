import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import './style.css';

class ViberButton extends Component {
    static propTypes = {
        userId : PropTypes.string.isRequired,
        record : PropTypes.object
    }

    static defaultProps = {
        record : {}
    }

    state = {
        userIdFromRecord : ''
    }

    componentWillMount() {
        const { record } = this.props;
        const userIdFromRecord = record && record.social && record.social.viber;

        if  (userIdFromRecord) this.setState({ userIdFromRecord });
    }
    render() {
        const { userId } = this.props;
        const { userIdFromRecord } = this.state;

        return userId || userIdFromRecord ? (
            <div>
                <a
                    href= {`viber://chat?number=${userId || userIdFromRecord}`}
                    target ='_blank'
                    className  ='telegramim_shadow ViberButton'
                    title  ='Viber'
                >
                    <i className='fab fa-viber' />
                </a>
            </div>
        ) : <div />;
    }
}

export default ViberButton;
