import React from 'react'

const Context = React.createContext()

export class Provider extends React.Component {
  constructor () {
    super()
    this.state = {
      chat: [
        { sender: 'bot', text: 'Hi! I\'m Chappie' }
      ],
      isLoading: false,
      weather: 'Overcast',
      actions: {
        createChat: (chat) => {
          this.setState({ chat: [...this.state.chat, chat], isLoading: true })
          this.getBotResponse(chat)
        }
      }
    }
  }

  getBotResponse (chat) {
    const headers = new window.Headers()
    headers.append('Authorization', `Bearer ${process.env.ACCESS_TOKEN}`)
    window.fetch(`https://api.dialogflow.com/v1/query?v=20150910&contexts=weather&lang=en&query=${chat.text}&sessionId=${window.localStorage.getItem('sessionToken')}`,{
      method: 'get',
      headers
    })
      .then(res => res.json())
      .then(res => {
        res.result.fulfillment.speech.split('\n')
          .forEach(text =>
            this.setState({
              chat: [...this.state.chat, { sender: 'bot', text }],
              isLoading: false,
              weather: text.match(/its/)
                ? text.split('its ')[1].split(' with')[0].replace(/\s+/g, '')
                : 'Overcast'
            }))
      })
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
