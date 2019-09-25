import React from 'react';
import {Route, Router, browserHistory, IndexRoute} from 'react-router';
import App from "./App";
import OneWidget from "./containers/OneWidget";
import TestedApp from "./TestedApp";
import SingleValueChart from "./components/SingleValueChart/SingleValueChart";
import ResizeBlock from "./components/ResizeBlock/ResizeBlock";
import ListApp from "./containers/ListApp";
import CreateBlockchain from "./containers/CreateBlockchain";
import BigList from "./containers/BigList";
import FlexComponent from "./components/FlexComponent";

const routers = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={OneWidget}/>
      <Route path="/test" component={TestedApp}/>
      <Route path="/list" component={ListApp}/>
      <Route path="/singlevalue" component={SingleValueChart}/>
      <Route path="/resize" component={ResizeBlock}/>
      <Route path="/block" component={CreateBlockchain}/>
      <Route path='biglist' component={BigList}/>
      <Route path='flex' component={FlexComponent}/>
    </Route>
  </Router>
);

export default routers;