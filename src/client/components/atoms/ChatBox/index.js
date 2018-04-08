import React from 'react'

const ChatBox = ({ text, sender }) => {
  return (
    <div className="chat-box-container">
      <div className={`chat-box ${sender}-chat`}>
        {text}
      </div>
      <div className="clear" />
    </div>
  )
}

export default ChatBox
