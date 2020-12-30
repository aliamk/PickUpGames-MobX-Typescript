import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'

import HomePage from '../../Features/home/HomePage'
import NavBar from '../../Features/nav/NavBar'
import VisitDashboard from '../../Features/visits/dashboard/VisitDashboard'
import VisitForm from '../../Features/visits/form/VisitForm'
import VisitDetails from '../../Features/visits/details/VisitDetails'
import NotFound from './NotFound'
import { ToastContainer } from 'react-toastify'


const App:React.FC<RouteComponentProps> = ({ location }) => {  
  
  // ======== DISPLAY DOM ======== //
  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
        <Route exact path='/' component={HomePage} />
        <Route path={'/(.+)'} render={() => (
          <Fragment>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/visits' component={VisitDashboard} />
                <Route exact path='/visits/:id' component={VisitDetails} />
                {/* Using location:key to create a new instance of the loaded component when a prop changes  */}
                <Route key={location.key} path={['/createVisit', '/manage/:id']} component={VisitForm} />  
                <Route component={NotFound} />    
              </Switch>
            </Container>
          </Fragment>
        )} />
    </Fragment>
  )
}

export default withRouter(observer(App)) 
