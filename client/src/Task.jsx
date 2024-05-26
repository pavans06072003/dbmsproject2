import React, { Component } from 'react';
class Task extends Component{
  constructor(props){
    super(props);
    this.state = {
	message : ""
    }

  }
  async componentWillMount(){


}
  render(){
      console.log("message", this.state.message);
    //return(<>Hello from Task  {this.state.message}</>);
      return(
          <></>

      );


  }
}
export default Task;
