import React, { useState } from 'react'

import SMDTimePicker  from 'smd-timepicker'
import 'smd-timepicker/dist/index.css'

const App = () => {
  const onSelectingTime = (time: any) => {
    console.log('app', time)
    setTime(time)
  }
  
  const [timeV, setTime] = useState('')
  // useEffect(() => {
  //   setTimeout(() => {
  //     setTime('09:23:56 pm')
  //   },3000)
  // }, [])
  return(
    <div>
      <h1 className='success' >My react library works good!! -- time is --{timeV}</h1>
      <div>
        <SMDTimePicker is24Hours={false} value={timeV} onChange={onSelectingTime} isIncludesSeconds={true}  format='hh:mm:ss'/>
      </div>
    </div>
  )
}

export default App
