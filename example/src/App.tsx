import React, { useState } from 'react'

import SMDTimePicker  from 'smd-timepicker'
import './AppExample.css'

const App = () => {
  const onSelectingTime = (time: any) => {
    console.log('app time is -- ', time)
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
      <div style={{marginLeft:'20px'}}>
        <SMDTimePicker onChange={onSelectingTime} is24Hours={false}  inputClass='' inputStyles={{}} selectAMPMClass='' selectAMPMStyles={{}} /> 
      </div>
      <div style={{marginTop:'110px'}}><h1>helloo siva sankula</h1></div>
    </div>
  )
}

export default App
