import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import './style.css';

class TelegramButton extends Component {
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
        const userIdFromRecord = record && record.social && record.social.telegram;

        if  (userIdFromRecord) this.setState({ userIdFromRecord });
    }

    prepareTelegramId = (id) => id && id.replace(/@/g, '');

    render() {
        const { userId } = this.props;
        const { userIdFromRecord } = this.state;

        return userId || userIdFromRecord ? (
            <div>
                <a
                    href= {`https://web.telegram.org/#/im?tgaddr=tg://resolve?domain=${this.prepareTelegramId(userId) || this.prepareTelegramId(userIdFromRecord)}`}
                    target ='_blank'
                    className  ='telegramim_button telegramim_shadow TelegramButton'
                    title  ='Telegram'
                >
                    <i className = 'ftelegramim ftelegramim-telegram-logo' />
                </a>
            </div>
        ) : <div />;
    }
}

export default TelegramButton;
