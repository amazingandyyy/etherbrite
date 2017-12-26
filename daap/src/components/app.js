import React from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { changeRootMsg } from '../actions'

const App = (props) => {
  setTimeout(props.changeRootMsg, 1000)
  return (<div>
    <div>
      
    </div>
  </div>)
}

const mapStateToProps = ({ root }) => ({
  root: root.msg
})

export default connect(mapStateToProps, { changeRootMsg })(App)
