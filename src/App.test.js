import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const component = renderer.create(<App/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
});
