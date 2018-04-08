import React from 'react'
import { connect } from '../../../context'

class ChatInput extends React.PureComponent {
  onChange (e) {
    if (e.key === 'Enter') {
      this.onSubmit()
    }
  }

  onSubmit () {
    this.props.actions.createChat({
      sender: 'user',
      text: this._input.value
    })
    this._input.value = ''
  }

  render () {
    return (
      <div className="text-area">
        <input
          placeholder="Enter message here"
          onKeyPress={this.onChange.bind(this)}
          ref={input => { this._input = input } }
        />
        <button onClick={this.onSubmit.bind(this)}>Send</button>
      </div>
    )
  }
}

export default connect(ChatInput)
