
import React       from 'react';
import ViberButton from './ViberButton';
import TelegramButton from './TelegramButton';
import './style.css';


function SocialBlock(props) {
    return (
        <div className = 'SocialBlock'>
            <TelegramButton {...props} />
            <span style={{ display: 'inline-block', width: 4 }}>&nbsp;</span>
            <ViberButton {...props} />
        </div>
    );
}

export default SocialBlock;
