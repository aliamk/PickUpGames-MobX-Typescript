import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import 'semantic-ui-css/semantic.min.css' 
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'
import { RootStoreContext } from '../../App/stores/rootStore'


const NavBar: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { user, logout } = rootStore.userStore;
    
    return (
        <Menu fixed='top' inverted >
            <Container> 
                <Menu.Item header as={NavLink} exact to='/' >
                    <img src="/assets/heart_logo.png" alt="logo" style={{marginRight: '10px'}} />
                    Pinga
                </Menu.Item>
                <Menu.Item name='Visits' as={NavLink} exact to='/visits' />
                <Menu.Item>
                    <Button as={NavLink} to='/createVisit' positive content='Add a Visit' />
                </Menu.Item>
                {user && (
                    <Menu.Item position='right'>
                        <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                        <Dropdown pointing='top left' text={user.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                as={Link}
                                to={`/profile/${user.username}`}
                                text='My profile'
                                icon='user'
                                />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                )}
            </Container>
        </Menu>
    )
}

export default observer(NavBar)