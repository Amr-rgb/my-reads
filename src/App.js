import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Main } from './components/Main';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
