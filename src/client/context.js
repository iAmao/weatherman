import React from 'react'

const Context = React.createContext()

export class Provider extends React.Component {
  constructor () {
    super()
    this.state = {
      chat: [
        { sender: 'bot', text: 'Hi! I\'m Chappie' }
      ],
      weather: {},
      actions: {
        createChat: (chat) => {
          this.setState({
            chat: [...this.state.chat, chat]
          })
        }
      }
    }
  }

  render () {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const connect = (Component) => {
  return props => (
    <Context.Consumer>
      {context => <Component {...context} />}
    </Context.Consumer>
  )
}
