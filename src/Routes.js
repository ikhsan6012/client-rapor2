import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'

const Login = lazy(() => import('./pages/Auth/Login'))

const Fallback = () => (
  <Container style={{ height: 'calc(100vh - 113px)', overflowY: 'auto' }}>
    <div>Loading...</div>
  </Container>
)

const Routes = props => {
  const { routes = [] } = props

  return(
    <Switch>
      <Suspense fallback={ <Fallback /> }>
        <Route
          exact path="/login"
          component={ Login }
        />
        { routes.map(r => {
          if(r.children){
            return r.children.map(child => (
              <Route 
                key={ child.title } 
                exact 
                path={ child.link }
                component={ child.component }
              />  
            ))
          } else {
            return(
              <Route 
                key={ r.title } 
                exact 
                path={ r.link }
                component={ r.component }
              />
            )
          }
        })}
      </Suspense>
    </Switch>
  )
}

export default Routes