import * as React from "react";

class BigList extends React.Component {
  state = {
    data: []
  };
  componentDidMount() {
    fetch('http://localhost:7001/parse')
      .then(r => r.json())
      .then(r => {
        this.setState({
          data: r.response
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div>
        {this.state.data.map((element, key) => (
          <div key={key}>{key}: {element.id}</div>
        ))}
      </div>
    )
  }
}

export default BigList;