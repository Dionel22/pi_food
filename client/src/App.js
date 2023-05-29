import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import Home from './views/Home/Home';
import Detail from './views/DetailPage/Detail';
import NavBar from "./components/NavBar/NavBar"

function App() {
  const location = useLocation()
 // console.log(location)
  return (
    <div>
      {location.pathname !== "/" && <NavBar/>}
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route  path="/home" component={Home}/>
      <Route  path="/detail/:id" component={Detail}/>
    </Switch>
    </div>
  );
}

export default App;
