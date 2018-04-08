import React from 'react'
import { connect } from '../../../context'

const Status = (props) => {
  return (
    <div className="status-container">
      <img className={props.weather} src="/free-outdoor-cafes-vector 3.jpg" alt="Weather"/>
    </div>
  )
}

export default connect(Status)
