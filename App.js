import React from 'react'
import {Provider} from 'react-redux'
import configureStore from './store'
import Splash from './Splash'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Splash/>
      </Provider>
    )
  }
}