import * as React from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class FiltersComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Filters</h1>
        <Select/>
        <Select/>
        <Select/>
      </div>
    )
  }
}

export default FiltersComponent;