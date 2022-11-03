import React, { useState } from 'react'

import SMDTimePicker  from 'smd-timepicker'
import './AppExample.css'

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
        <SMDTimePicker onChange={onSelectingTime} is24Hours={false}  inputClass='' inputStyles={{}} selectClass='' selectStyle={{}} />
      </div>
      <div>hii siva sankula siva</div>
    </div>
  )
}

export default App
