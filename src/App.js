import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import DashBoard from 'pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'App.css';

function App() {
  return (
    <Layout>
      <Router>
        <Route component={DashBoard} path={'/'}></Route>
      </Router>
    </Layout>
  );
}

export default App;
