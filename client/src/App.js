import './App.css';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import Home from './views/Home/Home';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
    </Switch>
  );
}

export default App;
