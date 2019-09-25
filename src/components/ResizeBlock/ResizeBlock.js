import React from 'react'
import update from 'immutability-helper';
import {withScreenSize} from '@vx/responsive'
import ChildBlock from './ChildBlock'
import {uniqueList} from '../../utils'

class ResizeBlock extends React.Component {
  componentWillMount() {
    this.setState({
      ID: 'table-01',
      filtersList: [],
      limitLevel: [],
      limitName: [],
      organisation: [],
      selected: {
        limitLevel: [],
        limitName: [],
        organisation: []
      }
    });
    this.getFilters();
  }

  setFilters = data => {
    let filters = {
      limitLevel: [],
      limitName: [],
      organisation: []
    };
    data.forEach(item => {
      filters.limitLevel.push({
        label: item.limitDefinition.limitLevel,
        value: item.limitDefinition.limitLevel
      });
      filters.limitName.push({
        label: item.limitDefinition.limitName,
        value: item.limitDefinition.limitName
      });
      filters.organisation.push({
        label: item.limitDefinition.organisation,
        value: item.limitDefinition.organisation
      });
    });
    this.setState({
      limitLevel: uniqueList(filters.limitLevel),
      limitName: uniqueList(filters.limitName),
      organisation: uniqueList(filters.organisation)
    })
  };

  getFilters = () => {
    fetch('http://localhost:7001/limits')
      .then(resp => resp.json())
      .then(response => { this.setFilters(response.response) })
      .catch(err => { console.log(err); })
  };

  changeFilterValue = (value, field) => {
    let selected = update(this.state.selected, {
      [field]: { $set: value }
    });
    this.setState({
      selected: selected
    })
  };

  render() {
    const {screenHeight, screenWidth} = this.props;
    const style = {
      height: screenHeight - 25,
      width: screenWidth
    };
    return(
      <div ref={this.state.ID} style={style} className={this.state.ID}>
        <ChildBlock
          selected={this.state.selected}
          limitName={this.state.limitName}
          organisation={this.state.organisation}
          limitLevel={this.state.limitLevel}
          changeFilterValue={this.changeFilterValue}
          parentId={this.state.ID}/>
      </div>
    )
  }
}

export default withScreenSize(ResizeBlock);