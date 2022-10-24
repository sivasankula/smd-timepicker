import React from 'react'

import SMDTimePicker  from 'smd-timepicker'
import 'smd-timepicker/dist/index.css'

const App = () => {

  const onSelectingTime = (e:any) => {
    console.log('app', e)
  }
  return(
    <div>
      <h1>My react library works good!!</h1>
      <div>
        <SMDTimePicker isIncludesSeconds={false} minsPlaceholder='MM' hoursPlaceholder='HH' secondsPlaceholder='SS' is24Hours={false} onChange={onSelectingTime} format='hh:mm a'/>
      </div>
    </div>
  )
}

export default App
