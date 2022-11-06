import React, { useEffect, useState } from 'react'
import {
  hoursOptions12,
  hoursOptions24,
  minsOrSeconds
} from '../Constants/DefaultData.enum'
import InputS from './InputS'
import timePickerStyles from '../styles.module.css'

interface InputSBulkProps {
  onChange?: (time: string) => void
  is24: boolean
  value: string
  format: string
  removeTimeSelectOptions: boolean
  hoursPlaceholder: string
  minutesPlaceholder: string
  isIncludesSeconds: boolean
  secondsPlaceholder: string
  inputStyles: React.CSSProperties
  inputClass: string
  timeSelectConfig?: {
    timeDropDownStyles?: React.CSSProperties
    timeInsideContainer?: React.CSSProperties
    selectSpecificData?: {
      isSelectedBGcolor?: string
      isSelectedFontColor?: string
      isHoveredBGcolor?: string
      isHoveredFontColor?: string
    }
  }
  onRecieveTime: (time: {
    hours: string
    minutes: string
    seconds: string
  }) => void
  actualTime: any
}

const InputSBulk = (props: InputSBulkProps) => {
  const [currentTime, setCurrentTime] = useState({
    hours: '',
    minutes: '',
    seconds: ''
  })
  const onRecievedData = (time: string, currentData: string) => {
    setCurrentTime((prev) => ({ ...prev, [currentData]: time }))
  }
  useEffect(() => {
    if (currentTime.hours && currentTime.minutes && currentTime.seconds) {
      props.onRecieveTime(currentTime)
    }
  }, [currentTime])
  return (
    <div className={timePickerStyles.flex__data}>
      <InputS
        name='hours'
        timeValue={props.actualTime.hours}
        onSendingData={onRecievedData}
        is24={props.is24}
        placeHolder={props.hoursPlaceholder}
        className={props.inputClass}
        inputStyle={props.inputStyles}
        renderData={props.is24 ? hoursOptions24 : hoursOptions12}
        timeSelectConfig={props.timeSelectConfig}
      />
      <InputS
        name='minutes'
        timeValue={props.actualTime.minutes}
        onSendingData={onRecievedData}
        is24={props.is24}
        placeHolder={props.minutesPlaceholder}
        className={props.inputClass}
        renderData={minsOrSeconds}
        inputStyle={props.inputStyles}
        timeSelectConfig={props.timeSelectConfig}
      />
      {props.isIncludesSeconds && (
        <InputS
          name='seconds'
          timeValue={props.actualTime.seconds}
          onSendingData={onRecievedData}
          is24={props.is24}
          placeHolder={props.secondsPlaceholder}
          className={props.inputClass}
          inputStyle={props.inputStyles}
          renderData={minsOrSeconds}
          timeSelectConfig={props.timeSelectConfig}
        />
      )}
    </div>
  )
}

export default InputSBulk
