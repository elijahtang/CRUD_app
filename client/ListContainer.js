import React from 'react';

class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['initial state data']
        }
    };

    componentDidMount() {
      fetch('/list')
      .then(res => res.json())
      .then(data => {
          console.log('data', data);
          this.setState({data})
      })
    };

    render() {
      console.log(this.state.data)
      return (
        <div>in ListContainer render
        </div>
      )
    }

}

export default ListContainer;