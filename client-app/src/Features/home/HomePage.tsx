import React, {Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';

const HomePage = () => {
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
         
            <Fragment>
              {/* <Header as='h2' inverted content='Welcome back' /> */}
              <Button as={Link} to='/login' size='huge' inverted>
                Log-In
              </Button>
            </Fragment>

            <Fragment>
            <Header as='h2' inverted content={`Welcome to Pinga`} />
            {/* <Button size='huge' inverted>
              Login
            </Button>
            <Button size='huge' inverted>
              Register
            </Button> */}
          </Fragment>

        </Container>
      </Segment>
    )
}

export default HomePage
