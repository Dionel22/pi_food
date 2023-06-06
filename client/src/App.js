import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import Home from './views/Home/Home';
import Detail from './views/DetailPage/Detail';
import Form from './views/FormPage/Form';

function App() {

  return (
    <div>
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route  path="/home" component={Home}/>
      <Route  path="/detail/:id" component={Detail}/>
      <Route  path="/create" component={Form}/>
    </Switch>
    </div>
  );
}

export default App;
