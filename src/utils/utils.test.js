import {addPagination, splitDataToPage, rollbackObjectToArray} from './index';

const pagination = {
  itemsOnPage: 2,
  position: 1,
  pageCounts: 10
};

const data = [
  {id: 1, name: "name 1"},
  {id: 2, name: "name 2"},
  {id: 3, name: "name 3"},
  {id: 4, name: "name 4"},
  {id: 5, name: "name 5"}
];

const expected = {
  0: [{id: 1, name: "name 1"}, {id: 2, name: "name 2"}],
  1: [{id: 3, name: "name 3"}, {id: 4, name: "name 4"}],
  2: [{id: 5, name: "name 5"}]
};

describe('addPagination', () =>{
  it('should return object with pagination', () =>{
    expect(addPagination(data, pagination.itemsOnPage)).toEqual({});
  });
});

describe('dataDividedByPages', ()=>{
  it('should return object parsed by page', function () {
    expect(splitDataToPage(data, pagination.itemsOnPage)).toEqual(expected);
  });
});

describe('rollbackObjectToArray', () => {
  it('should return array', function () {
    expect(rollbackObjectToArray(expected).length).toBe(5);
  });
});