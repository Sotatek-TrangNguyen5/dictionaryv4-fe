import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Transaction from "./pages/Dashboard/example";

function App() {
  return (
      <Router>
        <Route component={Transaction} path={'/test'} ></Route>
      </Router>

  );
}

function TEST() {
  return (<div>helloworld</div>)
}

export default App;
