import * as React from 'react'
import timepickerStyles from './styles.module.css'

interface Props {
  value?: string
  is24Hours?: boolean
  onChange?: (e: any) => void
  defaultType?: string
  hoursPlaceholder?: string
  minsPlaceholder?: string
  isIncludesSeconds?: boolean
  secondsPlaceholder?: string
  inputStyles?: any
  selectStyle?: any
  inputClass?: string
  selectClass?: string
}

const SMDTimePicker = (props: Props) => {
  const hoursRef = React.useRef<any>(null)
  const minutesRef = React.useRef<any>(null)
  const secondsRef = React.useRef<any>(null)
  const selectRef = React.useRef<any>(null)
  console.log(props)
  const onKeyDownCheck = (e: any) => {
    e.persist()
    console.log(e)
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
        secondsRef.current.focus()
      }
    } else if (e.key === 'Backspace') {
      console.log(minutesRef.current.value)
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
          secondsRef.current.focus()
        }
      }
    }
  }
  const onkeyPressonlyNumbersAccept = (event: any) => {
    event.persist()
    console.log(event)
    if (!(event.charCode >= 48 && event.charCode <= 57)) {
      event.preventDefault()
    }
  }
  const onChangeHRHandler = (event: any) => {
    event.persist()
    console.log('ref', hoursRef)
    console.log(event)
    if (event.target.value.length < 3) {
      if (event.target.name === 'hours') {
        if (event.target.value !== '1' && event.target.value !== '0') {
          if (event.target.value !== '') {
            if (event.target.value.length === 1) {
              hoursRef.current.value = `0${event.target.value}`
            }
            minutesRef.current.focus()
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
              secondsRef.current.focus()
            } else {
              secondsRef.current.value = `0${event.target.value}`
              selectRef.current.focus()
            }
          }
        } else {
          if (event.target.name === 'minutes') secondsRef.current.focus()
          else selectRef.current.focus()
        }
        // if (event.target.value[0] !== '6' && event.target.value[0] !== '7' && event.target.value[0] !== '8' && event.target.value[0] !== '9' )
      }
    } else {
      if (event.target.name === 'hours') {
        hoursRef.current.value = hoursRef.current.value.substring(0, 2)
      } else if (event.target.name === 'minutes') {
        minutesRef.current.value = minutesRef.current.value.substring(0, 2)
      } else if (event.target.name === 'seconds') {
        secondsRef.current.value = secondsRef.current.value.substring(0, 2)
      }
    }
  }
  return (
    <div>
      <div className={timepickerStyles.timepicker__align}>
        <div>
          <input
            type='text'
            name='hours'
            ref={hoursRef}
            placeholder={
              props.hoursPlaceholder === undefined
                ? 'HH'
                : props.hoursPlaceholder
            }
            className={`${timepickerStyles.timepicker__input} ${
              props.inputClass || ''
            }`}
            style={{ ...(props.inputStyles || {}) }}
            onKeyPress={onkeyPressonlyNumbersAccept}
            onChange={onChangeHRHandler}
            onKeyDown={onKeyDownCheck}
          />
        </div>
        <div>
          <input
            ref={minutesRef}
            name='minutes'
            placeholder={
              props.minsPlaceholder === undefined ? 'MM' : props.minsPlaceholder
            }
            className={`${timepickerStyles.timepicker__input} ${
              props.inputClass || ''
            }`}
            style={{ ...(props.inputStyles || {}) }}
            onKeyPress={onkeyPressonlyNumbersAccept}
            onChange={onChangeHRHandler}
            onKeyDown={onKeyDownCheck}
          />
        </div>
        {props.isIncludesSeconds && (
          <div>
            <input
              ref={secondsRef}
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
              onKeyPress={onkeyPressonlyNumbersAccept}
              onKeyDown={onKeyDownCheck}
              onChange={onChangeHRHandler}
            />
          </div>
        )}
        {!props.is24Hours && (
          <div>
            <select
              ref={selectRef}
              name='selectAMPM'
              style={{ ...(props.selectStyle || {}) }}
              className={`${timepickerStyles.timepicker__select} ${
                props.inputClass || ''
              }`}
              onKeyDown={onKeyDownCheck}
            >
              <option value=''>--</option>
              <option value='am'>AM</option>
              <option value='pm'>PM</option>
            </select>
          </div>
        )}
      </div>
    </div>
  )
}

export default SMDTimePicker
