import React, { Component } from 'react';

// Name component - represents a single todo item 
export default class Name extends Component {
    render() {
        return (
            <li>{this.props.name.firstName}</li>
        );
    }
}
