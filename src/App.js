import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Main } from './components/Main';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
