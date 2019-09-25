import * as React from "react";
import update from 'immutability-helper';
import {uniqueList, filterDataForFilter, filterTmpData, splitDataToPage} from '../utils'
import {MuiThemeProvider} from 'material-ui'
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar'
import {DropDownMenu, MenuItem} from 'material-ui/DropDownMenu'
import FiltersComponent from "../components/FiltersComponent";
import TableComponent from "../components/TableComponent";
import Pagination from 'material-ui-pagination';

class ListApp extends React.Component {
  componentWillMount() {
    this.setState({
      pagination: {
        itemsOnPage: 50,
        position: 1,
        pageCounts: 10
      },
      dataFromServer: [],
      dataDividedByPages: {
        0: []
      },
      data: [],
      filterFields: ['limitName', 'organisation', 'limitLevel'],
      filterFieldsQueue: [],
      selected: {
        limitName: [],
        organisation: [],
        limitLevel: []
      },
      limitName: [],
      organisation: [],
      limitLevel: [],
      filteredData: []
    });
    this.getLimitsFromServer();
  }

  normalizeData = (data) => {
    let Obj = {};
    const normalizedData = data.map(item => item.limitDefinition);
    this.state.filterFields.forEach(field => {
      Obj[field] = [];
      normalizedData.forEach(i => {
        let value = Obj[field];
        value.push({
          value: i[field],
          label: i[field]
        });
        Obj[field] = value
      })
    });
    // this.addPagination(normalizedData);
    const dataDividedToPage = splitDataToPage(normalizedData, this.state.pagination.itemsOnPage);
    const pageCounts = Math.ceil(data.length / this.state.pagination.itemsOnPage);
    this.setState({
      pagination: update(this.state.pagination, {pageCounts: { $set: pageCounts }}),
      dataFromServer: data,
      dataDividedByPages: dataDividedToPage,
      data: normalizedData,
      filteredData: dataDividedToPage[this.state.pagination.position],
      limitName: uniqueList(Obj.limitName),
      organisation: uniqueList(Obj.organisation),
      limitLevel: uniqueList(Obj.limitLevel),
    })
  };

  addPagination = (data) => {
    console.log(data);
    const {itemsOnPage} = this.state.pagination;
    const numbers = Math.ceil(data.length / itemsOnPage);
    console.log(`itemsOnPage: ${itemsOnPage}`);
    console.log(`total pages: ${numbers}`);
    data.forEach((i, idx) => {
      console.log(idx + 1);
      console.log(i);
    });
    this.setState({
      pagination: update(this.state.pagination, { pageCounts: { $set: numbers } })
    })
  };

  manageQueue = (filterFieldsQueue, field, value) => {
    let list = [];
    if (filterFieldsQueue.length === 0) {
      list.push(field);
    } else {
      if (value.length !== 0){
        if (filterFieldsQueue.includes(field)){
          list = filterFieldsQueue
        } else {
          list = filterFieldsQueue;
          list.push(field);
        }
      } else {
        list = filterFieldsQueue;
        list.splice(filterFieldsQueue.indexOf(field), 1);
      }
    }
    return list;
  };

  mergeList = (list, filters) => {
    let items = [];
    list.forEach(item =>{
      items.push(item);
    });
    filters
      .filter(f => !list.includes(f))
      .forEach(item => {items.push(item)});
    return items;
  };

  normalizeFilters = filter => {
    let Obj = {};
    for (let item in filter) {
      Obj[item] = filter[item].map(i => i.value)
    }
    return Obj;
  };
  
  applyFilter = (value, field) => {
    let tmpData = [];
    let filters = {};
    const {data, filterFieldsQueue, filterFields} = this.state;
    const list = this.manageQueue(filterFieldsQueue, field, value);
    const mergedList = this.mergeList(list, filterFields);

    let selected = update(this.state.selected, {
      [field]: { $set: value }
    });

    const normalizedFilters = this.normalizeFilters(selected);

    mergedList.forEach(i => {
      if (!tmpData.length){
        const a = filterDataForFilter(data, i);
        filters[i] = uniqueList(a);
        if (!normalizedFilters[i].length){
          tmpData = data;
        } else {
          tmpData = filterTmpData(data, normalizedFilters[i], i)
        }
      } else {
        let tmp = [];
        const a = filterDataForFilter(tmpData, i);
        filters[i] = uniqueList(a);
        if (normalizedFilters[i].length){
          tmp = filterTmpData(tmpData, normalizedFilters[i], i);
        }
        if (tmp.length) {
          tmpData = tmp;
        }
      }
    });

    this.setState({
      selected: selected,
      filterFieldsQueue: list,
      filteredData: tmpData,
      limitName: filters.limitName,
      limitLevel: filters.limitLevel,
      organisation: filters.organisation
    })
  };

  getLimitsFromServer = () => {
    fetch('http://localhost:7001/limits-big')
      .then(r => r.json())
      .then(resp => {
        this.normalizeData(resp.response);
      })
      .catch(err => {
        console.error(err)
      })
  };

  changePagePosition = (position) => {
    this.setState({
      pagination: update(this.state.pagination, {position: { $set: position  }}),
      filteredData: this.state.dataDividedByPages[position - 1]
    });
  };

  changeItemsNumberInTable = (event, index, value) => {
    const dataParsedPerPage = splitDataToPage(this.state.data, value);
    this.setState({
      pagination: update(this.state.pagination, {
        itemsOnPage: { $set: value  },
        pageCounts: {$set: Math.ceil(this.state.data.length / value)},
        current: { $set: 1 }
      }),
      filteredData: dataParsedPerPage[0],
      dataDividedByPages: dataParsedPerPage
    })
  };

  render() {
    return(
      <MuiThemeProvider>
        <div className="list-app">
          <FiltersComponent
            limitName={this.state.limitName}
            limitLevel={this.state.limitLevel}
            organisation={this.state.organisation}
            selectedLimitLevels={this.state.selected.limitLevel}
            selectedLimitNames={this.state.selected.limitName}
            selectedOrganisations={this.state.selected.organisation}
            changeValue={this.applyFilter}/>
          <Toolbar>
            <ToolbarGroup>
              <Pagination
                current={this.state.pagination.position}
                total={this.state.pagination.pageCounts}
                display={10}
                onChange={this.changePagePosition}/>
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarSeparator/>
              <DropDownMenu value={this.state.pagination.itemsOnPage} onChange={this.changeItemsNumberInTable}>
                <MenuItem value={5} primaryText="5"/>
                <MenuItem value={10} primaryText="10"/>
                <MenuItem value={20} primaryText="20"/>
                <MenuItem value={50} primaryText="50"/>
                <MenuItem value={6000} primaryText="6000"/>
              </DropDownMenu>
            </ToolbarGroup>
          </Toolbar>
          <TableComponent table={this.state.filteredData}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default ListApp;