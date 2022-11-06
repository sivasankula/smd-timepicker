import * as React from 'react'
import 'smd-timepicker/dist/index.css'
import Container from './Components/Container'
import { defaultOptions } from './Constants/DefaultData.enum'

interface SMDProps {
  onChange?: (time: string) => void
  is24Hours?: boolean
  value?: string
  format?: string
  removeTimeSelectOptions?: boolean
  hoursPlaceholder?: string
  minutesPlaceholder?: string
  isIncludesSeconds?: boolean
  secondsPlaceholder?: string
  inputStyles?: React.CSSProperties
  inputClass?: string
  selectAMPMStyles?: React.CSSProperties
  selectAMPMClass?: string
  selectAMPMOptions?: {
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

const SMDTimePicker = (props: SMDProps) => {
  return (
    <Container
      is24={props.is24Hours || false}
      value={props.value || ''}
      format={props.format || props.is24Hours ? 'HH:mm' : 'hh:mm a'}
      removeTimeSelectOptions={props.removeTimeSelectOptions || false}
      hoursPlaceholder={props.hoursPlaceholder || 'HH'}
      minutesPlaceholder={props.minutesPlaceholder || 'MM'}
      isIncludesSeconds={props.isIncludesSeconds || false}
      secondsPlaceholder={props.secondsPlaceholder || 'SS'}
      inputClass={props.inputClass || ''}
      inputStyles={props.inputStyles || {}}
      selectAMPMClass={props.selectAMPMClass || ''}
      selectAMPMStyles={props.selectAMPMStyles || {}}
      selectOptions={props.selectAMPMOptions || defaultOptions}
      timeSelectConfig={
        props.timeSelectConfig || {
          timeDropDownStyles: {},
          timeInsideContainer: {},
          selectSpecificData: {
            isSelectedBGcolor: 'lightblue',
            isSelectedFontColor: 'black',
            isHoveredBGcolor: 'lightgreen',
            isHoveredFontColor: 'green'
          }
        }
      }
    />
  )
}

export default SMDTimePicker
