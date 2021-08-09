import Home from './components/Home/Home'
import Header from './components/Header/Header'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Authentication from './components/Authentication/Authentication'

function App() {
  return (
    <div >
      <Router>
        <Header/>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>

          <Route path='/authentication'>
            <Authentication/>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
