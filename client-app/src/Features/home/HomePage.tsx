import React, {Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Segment, Header, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../App/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';


const HomePage = () => {
  const token = window.localStorage.getItem('jwt');
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;

    return (
      <Segment inverted textAlign='center' vertical className='masthead'>
        <Container text>
          <Header as='h1' inverted>
            PickUp Games
          </Header>
            {isLoggedIn && user && token ? (
              <Fragment>
                <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
                <Button as={Link} to='/visits' size='huge' className="ui inverted yellow button">
                  Join a Game!
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Header as='h2' inverted content={`Sign-up to find a game near you`} />
                <Button onClick={() => openModal(<LoginForm />)} className="ui inverted yellow button"  size='huge'>
                  Login
                </Button>
                <Button onClick={() => openModal(<RegisterForm />)} className="ui inverted yellow button" size='huge'>
                  Register
                </Button>
            </Fragment>
          )}
        </Container>        
      </Segment>
    )
}

export default HomePage
