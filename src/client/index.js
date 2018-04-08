import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './context'

import LandingPage from './pages/Landing.page'

ReactDOM.render(
  <Provider>
    <LandingPage />
  </Provider>,
  document.getElementById('app')
)
