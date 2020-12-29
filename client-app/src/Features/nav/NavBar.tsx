import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import 'semantic-ui-css/semantic.min.css' 
import { Button, Container, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import VisitStore from '../../App/stores/visitStore'


const NavBar: React.FC = () => {

    const visitStore = useContext(VisitStore)
    
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
            </Container>
        </Menu>
    )
}

export default observer(NavBar)