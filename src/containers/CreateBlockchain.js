import * as React from "react";
import {MuiThemeProvider} from 'material-ui'
import RaisedButton from 'material-ui/RaisedButton'

class CreateBlockchain extends React.Component {
  uploadFile = () => {
    const body = {"url": "MyService_uat", serviceName: 'd_server'};
    const options = {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    fetch('http://localhost:7001/service', options)
      .then(resp => resp.json())
      .then(data => {console.log(data);})
      .catch(err => {console.log(err)});
  };
  render() {
    return (
      <MuiThemeProvider>
        <RaisedButton onClick={this.uploadFile} label="hello" primary={true} />
      </MuiThemeProvider>
    )
  }
}

export default CreateBlockchain;