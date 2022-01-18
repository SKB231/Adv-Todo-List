import { Button } from 'bootstrap';
import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
    
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                  <button onClick={this.props.onReset} className="btn btn-primary btn-sm m-2">Reset</button>
                  <br />
                  {this.props.counters.map(counter => 
                  <Counter key={counter.id} 
                  val={counter.value}
                  onDelete={this.props.onDelete}
                  id={counter.id}
                  counter={counter}
                  handleIncriment={this.props.onIncriment}
                  handleDecrement={this.props.onDecrement}
                  />)}            
            </React.Fragment>
        );
    }
}
 
export default Counters;