import React from 'react'

import SMDTimePicker  from 'smd-timepicker'
import './AppExample.css'

const App = () => {
  // const onSelectingTime = (time: any) => {
  //   console.log('app', time)
  //   setTime(time)
  // }
  

  return(
    <div>
      <h1 className='success' >My react library works good!! -- time is --</h1>
      <div>
        <SMDTimePicker is24Hours={false} />
      </div>
      <div>hii siva sankula siva</div>
    </div>
  )
}

export default App
