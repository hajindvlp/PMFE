import React from 'react';
import authContext from './authContext';

class authProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            authorized: false,
            token: '',
            user: {},
        }
    }

    render() {
        return (
            <authContext.Provider value={{
                state: this.state
            }}>
                {this.props.children}
            </authContext.Provider>
        )
    }
}

export default authProvider;