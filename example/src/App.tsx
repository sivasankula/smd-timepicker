import React from 'react'

import SMDTimePicker  from 'smd-timepicker'
import 'smd-timepicker/dist/index.css'

const App = () => {

  const onSelectingTime = (time: any) => {
    console.log('app', time)
  }
  return(
    <div>
      <h1>My react library works good!!</h1>
      <div>
        <SMDTimePicker onChange={onSelectingTime}/>
      </div>
    </div>
  )
}

export default App
