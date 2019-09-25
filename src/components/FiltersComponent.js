import * as React from "react";
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector'
import 'react-select/dist/react-select.css';
import SelectComponent from "./SelectComponent";

class FiltersComponent extends React.Component {
  componentWillMount() {
    this.setState({
      multi: true
    })
  }
  changeValue = (value, field) => {
    this.props.changeValue(value, field);
  };
  handleResize = (elementWidth, elementHeight) => {
    // console.log(elementHeight);
  };
  render() {
    return (
      <div className="filters">
        <h1>Filters:</h1>
        <SelectComponent
          changeValue={this.changeValue}
          multi={this.state.multi}
          options={this.props.limitName}
          fieldName="limitName"
          value={this.props.selectedLimitNames}
          title="Limit Name"/>
        <SelectComponent
          changeValue={this.changeValue}
          value={this.props.selectedOrganisations}
          multi={this.state.multi}
          options={this.props.organisation}
          fieldName="organisation"
          title="Organisation"/>
        <SelectComponent
          changeValue={this.changeValue}
          multi={this.state.multi}
          value={this.props.selectedLimitLevels}
          options={this.props.limitLevel}
          fieldName="limitLevel"
          title="Limit Level"/>
        <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize} />
      </div>
    )
  }
}

FiltersComponent.propTypes = {
  limitName: PropTypes.array,
  organisation: PropTypes.array,
  limitLevel: PropTypes.array,
  selectedLimitNames: PropTypes.array,
  selectedOrganisations: PropTypes.array,
  selectedLimitLevels: PropTypes.array,
  changeValue: PropTypes.func
};

export default FiltersComponent;