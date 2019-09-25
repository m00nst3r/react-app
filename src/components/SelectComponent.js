import * as React from "react";
import PropTypes from 'prop-types';
import Select from 'react-select';

class SelectComponent extends React.Component {
  selectValue = (item) => {
    this.props.changeValue(item, this.props.fieldName)
  };
  render() {
    return(
      <div className="filter-item">
        <h1>{this.props.title}:</h1>
        <Select
          options={this.props.options}
          multi={this.props.multi}
          value={this.props.value}
          onChange={this.selectValue}/>
      </div>
    )
  }
}

SelectComponent.propTypes = {
  title: PropTypes.string,
  value: PropTypes.array,
  options: PropTypes.array,
  multi: PropTypes.bool,
  changeValue: PropTypes.func,
  fieldName: PropTypes.string
};

export default SelectComponent;