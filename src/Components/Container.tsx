import React, { useEffect, useState } from 'react'
import { defaultOptions } from '../Constants/DefaultData.enum'
import InputSBulk from './InputSBulk'
import Select from './Select'
import timePickerStyles from '../styles.module.css'

interface ContainerProps {
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
  selectAMPMStyles: React.CSSProperties
  selectAMPMClass: string
  selectOptions: {
    name: string
    value: string
  }[]
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
}

const Container = (props: ContainerProps) => {
  const [time, setTime] = useState({
    hours: '',
    minutes: '',
    seconds: '',
    amPm: ''
  })
  const onRecievedDataHandler = (time: {
    hours: string
    minutes: string
    seconds: string
  }) => {
    setTime((prev) => ({ ...prev, ...time }))
  }

  const onRecieveTimeHandler = (select: string) => {
    setTime((prev) => ({ ...prev, amPm: select }))
  }

  useEffect(() => {
    if (props.value) {
      const Tvalue = props.value || ''
      if (props.value.split(' ').length === 2) {
        const timeValue = Tvalue.split(' ')
        let amPm = timeValue[1]
        amPm = amPm[0] === 'P' || amPm[0] === 'p' ? 'pm' : 'am'
        let hoursValue = timeValue[0].split(':')[0]
        let minutesValue = timeValue[0].split(':')[1]
        hoursValue =
          hoursValue.length === 2
            ? hoursValue
            : hoursValue.length === 1
            ? `0${hoursValue}`
            : '12'
        minutesValue =
          minutesValue.length === 2
            ? minutesValue
            : minutesValue.length === 1
            ? `0${minutesValue}`
            : '00'
        hoursValue = +hoursValue <= 12 ? hoursValue : '12'
        minutesValue = +minutesValue <= 59 ? minutesValue : '00'
        if (props.isIncludesSeconds) {
          let secondsValue = timeValue[0].split(':')[2]
          secondsValue =
            secondsValue.length === 2
              ? secondsValue
              : secondsValue.length === 1
              ? `0${secondsValue}`
              : '00'
          setTime((prev) => ({ ...prev, seconds: secondsValue }))
        }
        setTime((prev) => ({
          ...prev,
          hours: hoursValue,
          minutes: minutesValue,
          amPm: amPm
        }))
      } else {
        const Tvalue = props.value || ''
        const timeValue = Tvalue.split(':')
        const hoursValue = timeValue[0]
        const minutesValue = timeValue[1]
        if (props.isIncludesSeconds) {
          const secondsValue = timeValue[2]
          setTime((prev) => ({ ...prev, seconds: secondsValue }))
        }
        setTime((prev) => ({
          ...prev,
          hours: hoursValue,
          minutes: minutesValue
        }))
      }
    }
  }, [])

  useEffect(() => {
    if (time.hours && time.minutes) {
      if (props.is24) {
        if (props.isIncludesSeconds) {
          if (time.seconds) {
            console.log('final time is', time)
          }
        } else {
          console.log('final time is ', time)
        }
      } else {
        if (time.amPm) {
          if (props.isIncludesSeconds) {
            if (time.seconds) {
              console.log('final time is', time)
            }
          } else {
            console.log('final time is ', time)
          }
        }
      }
    }
  }, [time])

  return (
    <div className={timePickerStyles.flex__data} id='containerTime'>
      <div>
        <InputSBulk
          {...props}
          onRecieveTime={onRecievedDataHandler}
          actualTime={time}
        />
      </div>
      {!props.is24 && (
        <div>
          <Select
            data={defaultOptions}
            selectAMPMStyles={props.selectAMPMStyles}
            selectAMPMClass={props.selectAMPMClass}
            selectOptions={props.selectOptions}
            onRecieveTime={onRecieveTimeHandler}
            actualTime={time.amPm}
          />
        </div>
      )}
    </div>
  )
}

export default Container
