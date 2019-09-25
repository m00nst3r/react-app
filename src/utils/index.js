import {uniq} from 'underscore';

export function uniqueList(list) {
  return uniq(list, (item, key) => item.value)
}

export function filterFirstItem(data, field) {
  return data.map(i => Object.assign({}, {value: i[field], label: i[field]}));
}

export function filterDataForFilter(data, field) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    arr.push({
      value: data[i][field],
      label: data[i][field]
    })
  }
  return arr;
}

export function filterTmpData(data, filter, field) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    if (filter.includes(data[i][field])){
      arr.push(data[i]);
    }
  }
  return arr;
}

export function filterFiltersFromData(mergeList, data, normalizedFilters) {
  let tmpData = [];
  let filters = {};
  mergeList.forEach(i => {
    if (!tmpData.length){
      data.forEach(element => {
        if (!normalizedFilters[i].length) {
          tmpData.push(element);
          filters[i] = uniqueList(filterFirstItem(data, i));
        } else {
          if (normalizedFilters[i].includes(element[i])) {
            filters[i] = uniqueList(filterFirstItem(data, i));
            tmpData.push(element);
          }
        }
      })
    } else {
      let tmp = [];
      tmpData.forEach(element => {
        if (normalizedFilters[i].length) {
          filters[i] = uniqueList(filterFirstItem(tmpData, i));
          if (element[i].includes(normalizedFilters[i])) {
            tmp.push(element);
          }
        } else {
          filters[i] = uniqueList(filterFirstItem(tmpData, i));
        }
      });
      if (tmp.length) {
        tmpData = tmp;
      }
    }
  });

  return {
    filters,
    tmpData
  };
}

export function newFilterForFilters(mergeList, data, normalizedFilters) {
  console.log(mergeList);
  console.log(data);
  console.log(normalizedFilters);

  return {
    filters: {
      limitName: [],
      limitLevel: [],
      organisation: []
    },
    tmpData: []
  }
}

export function addPagination(data, itemsOnPage) {
  let Obj = {};
  const totalPages = Math.ceil(data.length / itemsOnPage);
  for(let i = 0; i < totalPages; i++) {
    const index = i + 1;
    // console.log(`itemsOnPage: ${itemsOnPage}`);
    // console.log(`i: ${i}`);
    // console.log(`index: ${index}`);
    // console.log(data[i]);
    // console.log(Math.floor(itemsOnPage / index) + 1);
    Obj[index] = [];
  }

  console.log(Obj);
  return {}
}

export function splitDataToPage(data, itemsOnPage) {
  let Obj = {};
  let iterator = 0;
  for (let i = 0; i < data.length; i++) {
    const keys = Object.keys(Obj);
    const element = data[i];
    if (iterator === itemsOnPage) {
      iterator = 0;
      Obj[keys.length] = [].concat(element);
    } else {
      if (keys.length === 0) {
        Obj[keys.length] = [].concat(element);
      } else {
        const value = keys[keys.length - 1];
        Obj[value] = Obj[value].concat(element);
      }
    }
    iterator++;
  }
  return Obj;
}

export function rollbackObjectToArray(data) {
  let arr = [];
  for(let item in data) {
    data[item].forEach(i => {
      arr.push(i);
    })
  }
  return arr;
}