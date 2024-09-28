import Home from './pages/Home'
import User from './pages/User'
import SignIn from './pages/SignIn'

const routes = [
    { route: '/', element: <Home />},
    { route: '/profile', element: <User />},
    { route: '/signup', element: <SignIn />},
]

export default routes