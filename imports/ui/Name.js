import React, { Component } from 'react';

import { Names } from '../api/names.js';

// Name component - represents a single todo item 
export default class Name extends Component {
    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Names.update(this.props.name._id, {
            $set: { checked: !this.props.name.checked }, 
        });
    }
    
    deleteThisName() {
        Names.remove(this.props.name._id);
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
                
                <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.name.checked}
                    onClick={this.toggleChecked.bind(this)}
                />

                <span className="text">{this.props.name.firstName} {this.props.name.lastName}</span>
            </li>
        );
    }
}
