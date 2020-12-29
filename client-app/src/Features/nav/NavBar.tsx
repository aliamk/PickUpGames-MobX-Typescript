import React from 'react'
import 'semantic-ui-css/semantic.min.css' 
import { Button, Container, Menu } from 'semantic-ui-react'

// interface IProps {
//     openCreateForm: () => void;
// }

const NavBar: React.FC = () => {

    return (
        <Menu fixed='top' inverted >
            <Container> 
                <Menu.Item header /*as={NavLink} exact to='/'*/>
                    <img src="/assets/heart_logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Pinga
                </Menu.Item>
                <Menu.Item name='Visits' /*as={NavLink} exact to='/'*/ />
                <Menu.Item>
                    <Button /*onClick={openCreateForm}*/ positive content='Add a Visit' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar