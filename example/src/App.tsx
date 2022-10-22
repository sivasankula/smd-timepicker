import React from 'react'

import SMDTimePicker  from 'smd-timepicker'
import 'smd-timepicker/dist/index.css'

const App = () => {
  return(
    <div>
      <h1>My react library works good!!</h1>
      <div>
        <SMDTimePicker isIncludesSeconds={true} minsPlaceholder='MM' hoursPlaceholder='HH' secondsPlaceholder='SS' value='12:44 AM' is24Hours={true} />
      </div>
    </div>
  )
}

export default App
