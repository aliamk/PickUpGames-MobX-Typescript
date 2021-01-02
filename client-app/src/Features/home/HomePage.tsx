import React, {Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { RootStoreContext } from '../../App/stores/rootStore';

const HomePage = () => {

  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
        <Container text>
          <Header as='h1' inverted>
            <Image
              size='massive'
              src='/assets/heart_logo.png'
              alt='logo'              
              style={{ marginBottom: 12 }}
            />
            Pinga
          </Header>
            {isLoggedIn && user ? (
              <Fragment>
                <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
                <Button as={Link} to='/visits' size='huge' inverted>
                  Go to Visits!
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Header as='h2' inverted content={`Welcome to Reactivitities`} />
                <Button as={Link} to='/login' size='huge' inverted>
                  Login
                </Button>
                <Button as={Link} to='/register' size='huge' inverted>
                  Register
                </Button>
            </Fragment>
          )}
        </Container>
      </Segment>
    )
}

export default HomePage
