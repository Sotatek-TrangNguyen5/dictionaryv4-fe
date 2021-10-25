import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import DashBoard from "./pages/Dashboard/index";

function App() {
  return (
      <Router>
        <Route component={DashBoard} path={'/'} ></Route>
      </Router>

  );
}

export default App;
