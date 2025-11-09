import React, { useEffect } from 'react'
import AppRouter from './router/router'
import { useSelector } from 'react-redux'

const App = () => {

    // const auth = useSelector((state) => state.auth)
    // console.log("Auth State in App:", auth);
  return (
    <div>
      <AppRouter  />
    </div>
  )
}

export default App