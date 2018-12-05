import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Names } from '../api/names.js';

// Name component - represents a single todo item 
export default class Name extends Component {
    toggleChecked() {
        // Set the checked property to the opposite of its current value
        // Names.update(this.props.name._id, {
        //     $set: { checked: !this.props.name.checked }, 
        Meteor.call('names.setChecked', this.props.name._id, !this.props.name.checked);
        // });
    }
    
    deleteThisName() {
        // Names.remove(this.props.name._id);
        Meteor.call('names.remove', this.props.name._id);
    }
    
    togglePrivate() {
        Meteor.call('names.setPrivate', this.props.name._id, ! this.props.name.private);
    }

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in css
        const nameClassName = classnames({
            private: this.props.name.private,
        });

        return (
            <li className={nameClassName}>
                <button className="delete" onClick={this.deleteThisName.bind(this)}>
                    &times;
                </button> 
                
                {/* <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.name.checked}
                    onClick={this.toggleChecked.bind(this)}
                /> */}

                { this.props.showPrivateButton ? (
                    <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                    { this.props.name.private ? 'Private' : 'Public' }
                    </button>
                ) : ''}

                <span className="text">
                    <strong>{this.props.name.username}</strong>: {this.props.name.firstName} {this.props.name.lastName} {this.props.name.ssn}
                </span>
            </li>
        );
    }
}
