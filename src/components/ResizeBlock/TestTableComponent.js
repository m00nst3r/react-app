import * as React from "react";
import PropTypes from 'prop-types'

class TestTableComponent extends React.Component {
  render() {
    const style = {
      height: this.props.tableHeight,
      backgroundColor: '#00d1b2'
    };
    return(
      <div style={style}/>
    )
  }
}

TestTableComponent.propTypes = {
  tableHeight: PropTypes.number
};

export default TestTableComponent;