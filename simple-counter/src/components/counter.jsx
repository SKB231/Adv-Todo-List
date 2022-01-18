import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default class Counter extends React.Component {

    constructor(props)
    {
        super(props);
    }



    render() { 
        return <React.Fragment>  
            <span  className={this.getBadgeClasses()}>{this.formatValue()}</span>
            <button onClick={() => this.props.handleIncriment(this.props.counter)} className='btn btn-secondary btn-sm m-2'>Increment</button>
            <button onClick={() => this.props.handleDecrement(this.props.counter)} className='btn btn-secondary btn-sm m-2'>Decrement</button>
            <button onClick={() => this.props.onDelete(this.props.id)} className="btn btn-danger btn-sm m-2">Delete</button>
            <br />
        </React.Fragment>;
    }

    formatValue() {
        const value = this.props.val;
        return value === 0 ? "Zero": value;
    }

    getBadgeClasses()
    {
        let classes = "badge m-2";
        classes += this.props.val === 0? " badge-warning":" badge-primary";
        return classes;
    }

}

