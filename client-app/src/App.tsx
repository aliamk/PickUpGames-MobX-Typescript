import React, {Component} from 'react'
import "./App.css"
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import { Header, Image, List } from 'semantic-ui-react'

interface IState {
  visits: []
}

class App extends Component<{}, IState> {
  readonly state: IState = {
    visits: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/visits')
    .then((response) => {
      // console.log(response)
      this.setState({
        visits: response.data
      })
    })    
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Image src='../heart_logo.png' as='a' size='large' href='http://localhost:3000' />
          <Header.Content>Pinga</Header.Content>
        </Header>

        <List>
            {this.state.visits.map((visit: any) => (
              <List.Item key={ visit.id }>{ visit.title }</List.Item>
            ))}
        </List>
      </div>
    )
  }
}

export default App 