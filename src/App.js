import React, { Component } from 'react';
import BrickComponent from './components/BrickComponent'
import TestModal from "./modals/TestModal";
import {RaisedButton} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import CreateItemBlock from "./components/CreateItemBlock";


class App extends Component {
    componentWillMount() {
        injectTapEventPlugin()
    }

    showState = () => {
        console.log(this.props);
        console.log(this.state);
    };

  render() {
    return (
      <div className="App">
          <BrickComponent title="Test Component">
              <MuiThemeProvider>
                  <TestModal/>
              </MuiThemeProvider>
          </BrickComponent>
          <BrickComponent title="Create Component">
              <CreateItemBlock/>
          </BrickComponent>
          <MuiThemeProvider>
              <div>
                  <Tooltip placement="left" trigger={['hover']} overlay={<span>tooltip</span>}>
                      <RaisedButton disabled={true} onClick={this.showState} label="State"/>
                  </Tooltip>

              </div>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
