import React from 'react'

import Logo from '../components/molecules/Logo'
import Chat from '../components/molecules/Chat'
import Status from '../components/molecules/Status'

class LandingPage extends React.PureComponent {
  render () {
    return (
      <div className="container">
        <div className="main-container">
          <Logo />
          <div className="status-chat-container">
            <Status />
            <Chat />
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage
