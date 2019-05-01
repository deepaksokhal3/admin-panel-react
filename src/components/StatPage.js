import React, { Component } from 'react';
import { DataStudioKey } from '../etc/config.json';

class StatPage extends Component {
    render() {
        return (
            <div style = {{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <iframe
                    width='1200px'
                    height='900px'
                    src={`https://datastudio.google.com/embed/reporting/${DataStudioKey}`}
                    frameBorder = '0'
                />
            </div>
        );
    }
}

export default StatPage;
