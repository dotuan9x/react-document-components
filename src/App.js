import React, {Component} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import Layouts from 'Modules/Layouts';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" name="Home" component={Layouts} />
                </Switch>
            </Router>
        );
    }
}

export default App;
