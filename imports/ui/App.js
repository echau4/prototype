import React, { Component } from 'react';
import reactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Names } from '../api/names.js';

import Name from './Name.js';

//App component - represents the whole app
class App extends Component {
    handleSubmit(event) {
        event.preventDefault();

        //Find the text field via the React ref
        const data = reactDOM.findDOMNode(this.refs.textInput).value.trim();

        Names.insert({
            firstName: data,
            createdAt: new Date(), // current time
        });

        // Clear form
        reactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderTasks() {
        return this.props.names.map((name) => (
            <Name key={name._id} name={name} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Name List</h1>

                    <form className="new-name" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type to add new first names"
                        />
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        names: Names.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(App);
