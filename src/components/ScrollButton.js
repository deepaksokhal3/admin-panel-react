import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import './scrollButtonStyles.css';
import ChevronUp     from 'material-ui/svg-icons/navigation/expand-less';

export default class ScrollButton extends Component {
    static propTypes = {
        scrollStepInPx : PropTypes.string,
        delayInMs      : PropTypes.string
    }

    static defaultProps = {
        scrollStepInPx : 50,
        delayInMs      : 16.6
    }

    state = {
        intervalId : 0,
        isShow     : false
    };

    componentWillMount() {
        let lastPosition = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            lastPosition = window.scrollY; //eslint-disable-line

            if (!ticking) {
                window.requestAnimationFrame(() => {   //eslint-disable-line
                    this.handleShowButton(lastPosition);
                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', null);
    }

    handleScrollToTop() {
        const { delayInMs } = this.props;
        const intervalId = setInterval(this.scrollStep.bind(this), delayInMs);

        this.setState({ intervalId });
    }

    handleShowButton = (position) => {
        this.setState({ isShow: position > 500 ? true : false }); //eslint-disable-line
    }

    scrollStep() {
        const { scrollStepInPx } = this.props;

        if (window.pageYOffset === 0) clearInterval(this.state.intervalId); //eslint-disable-line
        window.scroll(0, window.pageYOffset - scrollStepInPx); //eslint-disable-line
    }

    render() {
        const { isShow } = this.state;

        return isShow ? (
            <button
                title='Back to top' className='scroll'
                onClick = {this.handleScrollToTop.bind(this)}
            >
                <ChevronUp  />
            </button>
        ) : <div />;
    }
}
