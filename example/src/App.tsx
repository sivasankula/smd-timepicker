import React, { useState } from 'react'

import SMDTimePicker from 'smd-timepicker'

const App = () => {
  const [timeV, setTime] = useState('')

  const onSelectingTime = (time: string) => {
    console.log('app time is -- ', time)
    setTime(time)
  }

  return (
    <div>
      <h1>Selected time is -- {timeV}</h1>
      <div style={{ marginLeft: '100px' }}>
        <SMDTimePicker
          onChange={onSelectingTime}
          is24Hours={false}
          value={timeV}
          isIncludesSeconds={true}
        />
      </div>
    </div>
  )
}

export default App
