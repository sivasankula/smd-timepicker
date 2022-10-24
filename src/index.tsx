import * as React from 'react'
import Input from './Components/Input'
import SelectAmPm from './Components/SelectAmPm'
import { defaultOptions } from './Constants/DefaultData.enum'
import timepickerStyles from './styles.module.css'

interface Props {
  value?: string
  is24Hours?: boolean
  onChange: (e: any) => void
  defaultType?: string
  hoursPlaceholder?: string
  minsPlaceholder?: string
  isIncludesSeconds?: boolean
  secondsPlaceholder?: string
  inputStyles?: any
  selectStyle?: any
  inputClass?: string
  selectClass?: string
  selectOptions?: any
  format?: string
}

const SMDTimePicker = (props: Props) => {
  const hoursRef = React.useRef<any>(null)
  const minutesRef = React.useRef<any>(null)
  const secondsRef = React.useRef<any>(null)
  const selectRef = React.useRef<any>(null)
  console.log(props)
  React.useEffect(() => {
    console.log(props.value)
    if (props.value) {
      const value = props.value || ''
      if (value.split(' ').length === 2) {
        const timeValue = value.split(' ')
        let amPm = timeValue[1]
        amPm = amPm[0] === 'A' || amPm[0] === 'a' ? 'am' : 'pm'
        const hoursValue = timeValue[0].split(':')[0]
        const minutesValue = timeValue[0].split(':')[1]
        if (selectRef && selectRef.current) {
          selectRef.current.value = amPm
        }
        if (hoursRef && hoursRef.current) {
          hoursRef.current.value = hoursValue
        }
        if (minutesRef && minutesRef.current) {
          minutesRef.current.value = minutesValue
        }
      } else {
      }
    }
  }, [])
  const onKeyDownCheck = (e: any) => {
    e.persist()
    // console.log(e)
    if (e.key === 'ArrowRight') {
      if (e.target.name === 'hours') {
        minutesRef.current.focus()
      } else if (e.target.name === 'minutes') {
        if (props.isIncludesSeconds) {
          secondsRef.current.focus()
        } else {
          selectRef.current.focus()
        }
      } else if (e.target.name === 'seconds') {
        selectRef.current.focus()
      }
    } else if (e.key === 'ArrowLeft') {
      if (e.target.name === 'minutes') {
        hoursRef.current.focus()
      } else if (e.target.name === 'seconds') {
        minutesRef.current.focus()
      } else if (e.target.name === 'selectAMPM') {
        if (props.isIncludesSeconds) secondsRef.current.focus()
        else minutesRef.current.focus()
      }
    } else if (e.key === 'Backspace') {
      // console.log(minutesRef.current.value)
      if (e.target.name === 'seconds') {
        if (secondsRef.current.value === '') {
          minutesRef.current.focus()
        }
      } else if (e.target.name === 'minutes') {
        if (minutesRef.current.value === '') {
          hoursRef.current.focus()
        }
      } else if (e.target.name === 'selectAMPM') {
        if (selectRef.current.value === '') {
          if (props.isIncludesSeconds) secondsRef.current.focus()
          else minutesRef.current.focus()
        }
      }
    }
  }

  // const getAllEnteredValues = () => {
  //   if(hoursRef.current.value.length == 2){

  //   }
  // }
  const onChangeHRHandler = (event: any) => {
    event.persist()
    // console.log('ref', hoursRef)
    console.log(event)
    if (event.target.name !== 'selectAMPM') {
      if (event.target.value.length < 3) {
        if (event.target.name === 'hours') {
          if (props.is24Hours) {
            if (
              event.target.value !== '0' &&
              event.target.value !== '1' &&
              event.target.value !== '2'
            ) {
              if (event.target.value !== '') {
                if (event.target.value.length === 1) {
                  hoursRef.current.value = `0${event.target.value}`
                }
                if (event.target.value[0] === '2') {
                  let isGreater = false
                  if (
                    event.target.value === '20' ||
                    event.target.value === '21' ||
                    event.target.value === '22' ||
                    event.target.value === '23'
                  ) {
                    isGreater = false
                  } else {
                    isGreater = true
                    hoursRef.current.value = hoursRef.current.value[0]
                  }
                  if (!isGreater) {
                    minutesRef.current.focus()
                  }
                } else {
                  minutesRef.current.focus()
                }
              }
            }
          } else {
            if (event.target.value !== '1' && event.target.value !== '0') {
              if (event.target.value !== '') {
                if (event.target.value.length === 1) {
                  hoursRef.current.value = `0${event.target.value}`
                }
                if (
                  event.target.value.length === 2 &&
                  event.target.value[0] === '1'
                ) {
                  if (
                    !(
                      event.target.value === '10' ||
                      event.target.value === '11' ||
                      event.target.value === '12'
                    )
                  ) {
                    hoursRef.current.value = event.target.value[0]
                  } else {
                    minutesRef.current.focus()
                  }
                } else if (event.target.value === '00') {
                  hoursRef.current.value = '0'
                } else {
                  minutesRef.current.focus()
                }
              }
            }
          }
        } else if (
          event.target.name === 'minutes' ||
          event.target.name === 'seconds'
        ) {
          if (event.target.value.length === 1) {
            if (
              event.target.value === '6' ||
              event.target.value === '7' ||
              event.target.value === '8' ||
              event.target.value === '9'
            ) {
              if (event.target.name === 'minutes') {
                minutesRef.current.value = `0${event.target.value}`
                if (props.isIncludesSeconds) secondsRef.current.focus()
                else if (!props.is24Hours) selectRef.current.focus()
              } else {
                secondsRef.current.value = `0${event.target.value}`
                if (!props.is24Hours) selectRef.current.focus()
              }
            }
          } else {
            if (event.target.name === 'minutes') {
              if (props.isIncludesSeconds) secondsRef.current.focus()
              else if (!props.is24Hours) selectRef.current.focus()
            } else {
              if (!props.is24Hours) selectRef.current.focus()
            }
          }
        }
      } else {
        if (event.target.name === 'hours') {
          if (event.target.value[0] !== '0') {
            hoursRef.current.value = hoursRef.current.value.substring(1)
          } else {
            hoursRef.current.value = hoursRef.current.value.substring(0, 2)
          }
          minutesRef.current.focus()
        } else if (event.target.name === 'minutes') {
          console.log(event.target.value)
          if (event.target.value[0] !== '0') {
            minutesRef.current.value = minutesRef.current.value.substring(1)
          } else {
            minutesRef.current.value = minutesRef.current.value.substring(0, 2)
          }
          if (props.isIncludesSeconds) secondsRef.current.focus()
          else if (!props.is24Hours) selectRef.current.focus()
        } else if (event.target.name === 'seconds') {
          if (event.target.value[0] !== '0') {
            secondsRef.current.value = secondsRef.current.value.substring(1)
          } else {
            secondsRef.current.value = secondsRef.current.value.substring(0, 2)
          }
          if (!props.is24Hours) selectRef.current.focus()
        }
      }
    } else {
    }
  }
  return (
    <div>
      <div className={timepickerStyles.timepicker__align}>
        <div>
          <Input
            type='text'
            name='hours'
            refChild={hoursRef}
            placeholder={
              props.hoursPlaceholder === undefined
                ? 'HH'
                : props.hoursPlaceholder
            }
            className={`${timepickerStyles.timepicker__input} ${
              props.inputClass || ''
            }`}
            style={{ ...(props.inputStyles || {}) }}
            // onKeyPress={onkeyPressonlyNumbersAccept}
            onChange={onChangeHRHandler}
            onKeyDown={onKeyDownCheck}
          />
        </div>
        <div>
          <Input
            type='text'
            refChild={minutesRef}
            name='minutes'
            placeholder={
              props.minsPlaceholder === undefined ? 'MM' : props.minsPlaceholder
            }
            className={`${timepickerStyles.timepicker__input} ${
              props.inputClass || ''
            }`}
            style={{ ...(props.inputStyles || {}) }}
            // onKeyPress={onkeyPressonlyNumbersAccept}
            onChange={onChangeHRHandler}
            onKeyDown={onKeyDownCheck}
          />
        </div>
        {props.isIncludesSeconds && (
          <div>
            <Input
              type='text'
              refChild={secondsRef}
              name='seconds'
              placeholder={
                props.secondsPlaceholder === undefined
                  ? 'SS'
                  : props.secondsPlaceholder
              }
              className={`${timepickerStyles.timepicker__input} ${
                props.inputClass || ''
              }`}
              style={{ ...(props.inputStyles || {}) }}
              // onKeyPress={onkeyPressonlyNumbersAccept}
              onKeyDown={onKeyDownCheck}
              onChange={onChangeHRHandler}
            />
          </div>
        )}
        {!props.is24Hours && (
          <div>
            <SelectAmPm
              refChild={selectRef}
              name='selectAMPM'
              data={props.selectOptions ? props.selectOptions : defaultOptions}
              style={{ ...(props.selectStyle || {}) }}
              className={`${timepickerStyles.timepicker__select} ${
                props.inputClass || ''
              }`}
              onSelect={(e) => {
                console.log(e, 'and select re', selectRef.current.value)
              }}
              onKeyDown={onKeyDownCheck}
              // onChange={onChangeHRHandler}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SMDTimePicker
