import React from 'react';
import PropTypes from 'prop-types'
import {withParentSize} from '@vx/responsive'
import FiltersComponent from "../FiltersComponent";
import TestTableComponent from "./TestTableComponent";

class ChildBlock extends React.Component {
  componentWillMount() {
    this.setState({
      tempHeight: 0
    })
  }

  componentDidMount() {
    this.setState({
      tempHeight: document.querySelector(`.${this.props.parentId} .filters`)
    })
  }

  changeFilter = (filter, item) => {
    this.props.changeFilterValue(filter, item)
  };

  render() {
    const {parentHeight, parentId} = this.props;
    const filterBlock = document.querySelector(`.${parentId} .filters`);
    let tableHeight = 0;
    if (filterBlock === null) {
      tableHeight = parentHeight - this.state.tempHeight;
    } else {
      tableHeight = parentHeight - filterBlock.clientHeight;
    }
    return (
      <div>
        <FiltersComponent
          selectedLimitLevels={this.props.selected.limitLevel}
          selectedOrganisations={this.props.selected.organisation}
          selectedLimitNames={this.props.selected.limitName}
          changeValue={this.changeFilter}
          limitLevel={this.props.limitLevel}
          organisation={this.props.organisation}
          limitName={this.props.limitName}/>
        <TestTableComponent tableHeight={tableHeight}/>
      </div>
    )
  }
}

ChildBlock.propTypes = {
  parentHeight: PropTypes.any,
  parentId: PropTypes.string,
  limitLevel: PropTypes.array,
  limitName: PropTypes.array,
  organisation: PropTypes.array,
  changeFilterValue: PropTypes.func,
  selected: PropTypes.object
};

export default withParentSize(ChildBlock);