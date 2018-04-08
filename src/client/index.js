import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './context'

import LandingPage from './pages/Landing.page'

const rand = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

if (!window.localStorage.getItem('sessionToken')) {
  window.localStorage.setItem('sessionToken', rand)
}

ReactDOM.render(
  <Provider>
    <LandingPage />
  </Provider>,
  document.getElementById('app')
)
