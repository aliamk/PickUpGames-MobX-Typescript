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
        <Menu fixed='top' inverted size='massive'>
            <Container color='yellow'> 
                <Menu.Item header as={NavLink} exact to='/' >
                    {/* <img src="/assets/heart_logo.png" alt="logo" style={{marginRight: '10px'}} /> */}
                    PickUp Games
                </Menu.Item>
                <Menu.Item name='Games' as={NavLink} exact to='/visits'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createVisit' className="ui inverted yellow button" content='Add a Game' />
                </Menu.Item>
                {user && (
                    <Menu.Item position='right'>
                        <Image avatar spaced='right' src={user.image || '/assets/users/user.png'} />
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