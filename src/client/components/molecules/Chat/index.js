import React from 'react'

import { connect } from '../../../context'

import ChatBox from '../../atoms/ChatBox'
import ChatInput from '../../atoms/ChatInput'

const Chat = (props) => {
  return (
    <div className="chat-container">
      <div className="chat-area">
        {props.chat.map(chat => (
          <ChatBox key={chat.text.substr(7)} text={chat.text} sender={chat.sender} />
        ))}
      </div>
      <ChatInput />
    </div>
  )
}

export default connect(Chat)
