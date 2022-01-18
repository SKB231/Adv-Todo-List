import React, { Component } from 'react';

class NavBar extends Component {
    constructor(props)
    {
        super(props);
    }
    render() { 
        return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">
                    <span className="badge badge-pill badge-secondary">{this.props.count}</span>
                </span>
            </div>
        </nav>
        );
    }
}
 
export default NavBar;