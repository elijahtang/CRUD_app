import React from 'react';

class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ['initial state data']
        }
    };

    addTask() {
      let taskValue = document.getElementById('inputAddTask').value;
      console.log('in addTask() taskValue', taskValue);
      fetch('/list', {
        method: 'POST',
        body: JSON.stringify({
          task: taskValue
        }),
        headers: {"Content-Type": "application/json"}
      })
    }

    delTask() {
      let deleteID = document.getElementById('inputDelTask').value;
      console.log('in delTask() deleteID', deleteID);
      fetch(`/list/${deleteID}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
        })
        .catch((err) => alert(err.message));
      }

    componentDidMount() {
      fetch('/list')
      .then(res => res.json())
      .then(data => {
          console.log('data', data);
          this.setState({list: data})
      })
    };

    render() { // this triggers first
      
      const listID = [];
      this.state.list.forEach(obj => {
        listID.push(<p>{obj.id}</p>);
      })

      const myList = [];
      this.state.list.forEach(obj => {
        myList.push(<p>{obj.task}</p>);
      })

      const listCompleted = [];
      this.state.list.forEach(obj => {
        listCompleted.push(<p>{obj.completed}</p>);
      })

      return (
        <div>
         <div>
            <label form="taskLabel">Add a new task: </label>
            <input type="text" id="inputAddTask" />
            <button type="button" id="buttonAddTask" onClick={this.addTask}>Add Task</button>
        </div>
        <div>
            <label form="taskLabeld">Delete a task: </label>
            <input type="text" id="inputDelTask" />
            <button type="button" id="buttonDelTask" onClick={this.delTask}>Delete Task</button>
        </div>
    
        <div class="row">
          <div class="column"><p>Task</p><p>{listID}</p></div>
          <div class="column"><p>Description</p><p>{myList}</p></div>
          <div class="column"><p>Completed?</p><p>{listCompleted}</p></div>
        </div>
        </div>
      )
    }
}

export default ListContainer;