import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

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
    
    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in css
        const nameClassName = this.props.name.checked ? 'checked' : '';

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

                <span className="text">
                    <strong>{this.props.name.username}</strong>: {this.props.name.firstName} {this.props.name.lastName} {this.props.name.ssn}
                </span>
            </li>
        );
    }
}
