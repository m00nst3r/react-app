import * as React from "react";
import {MuiThemeProvider} from 'material-ui'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import PropTypes from 'prop-types'

class TableComponent extends React.Component {
  static propTypes = {
    table: PropTypes.array
  };
  render() {
    return(
      <div className="table-limit">
        <MuiThemeProvider>
          <Table selectable={false} multiSelectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Limit Name</TableHeaderColumn>
                <TableHeaderColumn>Organisation</TableHeaderColumn>
                <TableHeaderColumn>Limit Level</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.table.map((i, key)=>(
                <TableRow key={key}>
                  <TableRowColumn>{i.limitName}</TableRowColumn>
                  <TableRowColumn>{i.organisation}</TableRowColumn>
                  <TableRowColumn>{i.limitLevel}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default TableComponent;