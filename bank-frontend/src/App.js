
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import routes from './routes';
import './assets/app.css'
import Layout from './layout/Layout';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map(({route, element}, index) => (
            <Route key={index} path={route} element={element} />
          ))}
        </Routes>
        </Layout>
    </Router>
  );
}

export default App;
