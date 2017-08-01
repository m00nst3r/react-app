import * as React from "react";
import {RaisedButton} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

class ShowTooltips extends React.Component {
  render() {
    return(
      <MuiThemeProvider>
        <div>
          <Tooltip placement="left" trigger={['hover']} overlay={<span>tooltip</span>}>
            <RaisedButton disabled={true} onClick={this.showState} label="State"/>
          </Tooltip>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default ShowTooltips;