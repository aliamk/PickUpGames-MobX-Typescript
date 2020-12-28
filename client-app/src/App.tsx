import React, {Component} from 'react'
import "./App.css"
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import { Header, Icon, List } from 'semantic-ui-react'

// interface IState {
//   values: []
// }

class App extends Component {
  state = {
    values: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/values')
    .then((response) => {
      // console.log(response)
      this.setState({
        values: response.data
      })
    })    
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Pinga</Header.Content>
        </Header>

        <List>
            {this.state.values.map((value) => (
              <List.Item key={ value.Id }>{ value.name }</List.Item>
            ))}
        </List>
      </div>
    )
  }
}

export default App 