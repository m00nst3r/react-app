import React, {Component} from 'react';
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Navigation from "./components/Navigation";


class App extends Component {
  componentWillMount() {
    injectTapEventPlugin()
  }



  render() {
    return (
      <div className="App">
        <Navigation/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
