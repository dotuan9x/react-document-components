import React, {Component} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import ExampleLayouts from 'Modules/Layouts/Example';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" name="Home" component={ExampleLayouts} />
                </Switch>
            </Router>
        );
    }
}

export default App;
