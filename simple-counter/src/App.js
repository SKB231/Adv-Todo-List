import './App.css';
import Navbar from './components/navbar'
import Counters from "./components/counters"
import React, { Component } from 'react';


class App extends Component {
  state = { 
    Counters: [
        {id: 1, value: 3},
        {id: 2, value: 2},
        {id: 3, value: 1},
        {id: 4, value: 0},
    ]
 }

handleDelete= (counterID) =>
{
    const Counters = this.state.Counters.filter((v) => (v.id !== counterID));
    
    this.setState({
        Counters
    });
}

handleReset= () =>
{
    const counters = this.state.Counters.map(c=> {
        c.value = 0;
        return c;
    });

    this.setState({counters});

}

handleIncriment=(counter)=>
{
    const counters = JSON.parse(JSON.stringify(this.state.Counters));
    let index = this.state.Counters.indexOf(counter);
    counters[ index ].value++;
    this.setState({Counters:counters});
}

handleDecrement=(counter)=>
{
    const counters = JSON.parse(JSON.stringify(this.state.Counters));
    let index = this.state.Counters.indexOf(counter);
    counters[ index ].value = (counters[index].value > 0)? counters[index].value-1:0;
    this.setState({Counters:counters});
}
  render() { 
    return (
      <React.Fragment>
        <Navbar count={(this.state.Counters.filter((v)=> (v.value>0))).length}/>
        <main className="container">
          <Counters 
           counters={this.state.Counters}
           onReset={this.handleReset}
           onIncriment={this.handleIncriment} 
           onDecrement={this.handleDecrement}
           onDelete={this.handleDelete}/>
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;

