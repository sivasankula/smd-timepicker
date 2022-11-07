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
          isIncludesSeconds={false}
          inputClass=''
          inputStyles={{ width:'30px', height:'30px', color: 'blue', fontWeight:'bold' }}
          selectAMPMClass=''
          selectAMPMStyles={{ width:'60px', height:'30px'  }}
          timeSelectConfig={{
            selectSpecificData: { isSelectedBGcolor: 'orange', isHoveredBGcolor:"gray" },
            timeInsideContainer: {backgroundColor: "lightcyan"}
          }}
        />
      </div>
    </div>
  )
}

export default App