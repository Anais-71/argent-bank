
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import routes from './routes';
import './assets/app.css'

function App() {
  return (
    <Router>
        <Routes>
          {routes.map(({route, element}, index) => (
            <Route key={index} path={route} element={element} />
          ))}
        </Routes>
    </Router>
  );
}

export default App;
