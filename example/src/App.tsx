import React, { useState } from 'react'

import SMDTimePicker  from 'smd-timepicker'
import 'smd-timepicker/dist/index.css'

const App = () => {
  const onSelectingTime = (time: any) => {
    console.log('app', time)
    setTime(time)
  }
  
  const [timeV, setTime] = useState('')

  return(
    <div>
      <h1 className='success' >My react library works good!! -- time is --{timeV}</h1>
      <div>
        <SMDTimePicker is24Hours={true} value={timeV} onChange={onSelectingTime} isIncludesSeconds={true}  format='h:m:s'/>
      </div>
    </div>
  )
}

export default App
