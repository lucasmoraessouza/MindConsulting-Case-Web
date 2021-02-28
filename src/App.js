// import { routes, PrivateRoute } from './routes'
import { routes, PrivateRoute } from './routes'
import Dashboard from './components/Dashboard'
import { isAuthenticated } from './services/auth'
import NotFound from './components/NotFound'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin">
          {isAuthenticated() ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        {routes.public.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact
            component={route.component}
          />
        ))}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
