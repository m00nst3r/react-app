import * as React from "react";
import {MuiThemeProvider} from 'material-ui'
import PropTypes from 'prop-types'
import Pagination from 'material-ui-pagination'

class TablePagination extends React.Component{
  changeValue = (a) => {
    console.log(a);
  };
  render() {
    console.log(this.props.table);
    return(
      <MuiThemeProvider>
        <Pagination display={this.props.display} total={this.props.total} onChange={this.changeValue}/>
      </MuiThemeProvider>
    )
  }
}

TablePagination.propTypes = {
  total: PropTypes.number,
  display: PropTypes.number,
  changePage: PropTypes.func
};

export default TablePagination;