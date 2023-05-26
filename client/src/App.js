import './App.css';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage}/>
    </Switch>
  );
}

export default App;
