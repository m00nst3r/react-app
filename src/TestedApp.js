import React, {Component} from 'react';
import BrickComponent from './components/BrickComponent'
// import TestModal from "./modals/TestModal";
import CreateItemBlock from "./components/CreateItemBlock";
import ShowTooltips from './components/ShowTooltips';
import TableComponent from "./components/TableComponent";
import FiltersComponent from "./components/FiltersComponent";


class App extends Component {
  showState = () => {
    console.log(this.props);
    console.log(this.state);
  };

  render() {
    return (
      <div className="App">
        <BrickComponent title="My Table">
          <FiltersComponent/>
          <TableComponent table={[]}/>
        </BrickComponent>
        <BrickComponent title="Create Component">
          <CreateItemBlock/>
        </BrickComponent>
        <BrickComponent title="Test Component">
          <ShowTooltips/>
        </BrickComponent>
      </div>
    );
  }
}

export default App;
