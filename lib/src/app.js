import React from 'react';
import Game from './game/game';
import Settings from './settings/localSettings';

class App extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <Settings />
                <Game />
            </div>
        )
    }
}

export default App;