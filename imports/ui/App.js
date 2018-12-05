import React, { Component } from 'react';
import reactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Names } from '../api/names.js';

import Name from './Name.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

//App component - represents the whole app
class App extends Component {
    handleSubmit(event) {
        event.preventDefault();

        //Find the text field via the React ref
        const data = reactDOM.findDOMNode(this.refs.firstN).value.trim().toString();
        const data1 = reactDOM.findDOMNode(this.refs.lastN).value.trim().toString();
        const data2 = Number(reactDOM.findDOMNode(this.refs.ssn).value.trim());

        // Names.insert({
        //     firstName: data,
        //     lastName: data1,
        //     ssn: data2,
        //     createdAt: new Date(), // current time
        //     owner: Meteor.userId(), // _id of logged in user
        //     username: Meteor.user().username, // username of logged in user
        // });

        Meteor.call('names.insert', data, data1, data2);

        // Clear form
        reactDOM.findDOMNode(this.refs.firstN).value = '';
        reactDOM.findDOMNode(this.refs.lastN).value = '';
        reactDOM.findDOMNode(this.refs.ssn).value = '';
    }

    renderNames() {
    //     return this.props.names.map((name) => (
    //         <Name key={name._id} name={name} />
    //     ));
    let filteredNames = this.props.names;

    return filteredNames.map((name) => {
        const currentUserId = this.props.currentUser && this.props.currentUser._id;
        const showPrivateButton = name.owner === currentUserId;

        return (
            <Name 
            key={name._id}
            name={name}
            showPrivateButton={showPrivateButton}
            />
        );
    });
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Name List</h1>
                    
                    <AccountsUIWrapper />
                    
                    { this.props.currentUser ? 
                    <form className="new-name" >
                        <input
                            type="text"
                            ref="firstN"
                            placeholder="Add new first name"
                        />
                        <input
                            type="text"
                            ref="lastN"
                            placeholder="Add new last name"
                        />
                        <input
                            type="number"
                            ref="ssn"
                            placeholder="Add your Social Security Number"
                        />
                        <input
                            type="submit" 
                            onClick={this.handleSubmit.bind(this)}
                        />
                    </form> : ''
                    }
                </header>

                <ul>
                    {this.renderNames()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('names');

    return {
        names: Names.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
})(App);
