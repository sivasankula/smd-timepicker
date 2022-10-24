import * as React from 'react'
import Input from './Components/Input'
import SelectAmPm from './Components/SelectAmPm'
import { defaultOptions } from './Constants/DefaultData.enum'
import timepickerStyles from './styles.module.css'

interface Props {
  value?: string
  is24Hours?: boolean
  onChange: (e: any) => void
  hoursPlaceholder?: string
  minutesPlaceholder?: string
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
  const {
    value = '',
    is24Hours = false,
    // onChange = (e: any) => {},
    hoursPlaceholder = 'HH',
    minutesPlaceholder = 'MM',
    secondsPlaceholder = 'SS',
    isIncludesSeconds = false,
    inputStyles,
    // selectClass,
    selectStyle,
    inputClass,
    selectOptions
    // format,
  } = props
  const hoursRef = React.useRef<any>(null)
  const minutesRef = React.useRef<any>(null)
  const secondsRef = React.useRef<any>(null)
  const selectRef = React.useRef<any>(null)
  React.useEffect(() => {
    if (value) {
      const Tvalue = value || ''
      if (value.split(' ').length === 2) {
        const timeValue = Tvalue.split(' ')
        let amPm = timeValue[1]
        amPm = amPm[0] === 'A' || amPm[0] === 'a' ? 'am' : 'pm'
        const hoursValue = timeValue[0].split(':')[0]
        const minutesValue = timeValue[0].split(':')[1]
        if (isIncludesSeconds) {
          const secondsValue = timeValue[0].split(':')[2]
          if (secondsRef && secondsRef.current) {
            secondsRef.current.value = secondsValue
          }
        }
        if (selectRef && selectRef?.current) {
          selectRef.current.value = amPm
        }
        if (hoursRef && hoursRef?.current) {
          hoursRef.current.value = hoursValue
        }
        if (minutesRef && minutesRef?.current) {
          minutesRef.current.value = minutesValue
        }
      } else {
        const Tvalue = value || ''
        const timeValue = Tvalue.split(':')
        let hoursValue = timeValue[0]
        const minutesValue = timeValue[1]
        hoursValue =
          +hoursValue > 12 ? JSON.stringify(+hoursValue - 12) : hoursValue
        if (hoursRef && hoursRef?.current) {
          hoursRef.current.value =
            hoursValue.length === 1 ? `0${hoursValue}` : hoursValue
        }
        if (minutesRef && minutesRef?.current) {
          minutesRef.current.value = minutesValue
        }
      }
    }
  }, [])
  const onKeyDownCheck = (e: any) => {
    e.persist()
    if (e.key === 'ArrowRight') {
      if (e.target.name === 'hours') {
        minutesRef.current.focus()
      } else if (e.target.name === 'minutes') {
        if (isIncludesSeconds) {
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
        if (isIncludesSeconds) secondsRef.current.focus()
        else minutesRef.current.focus()
      }
    } else if (e.key === 'Backspace') {
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
          if (isIncludesSeconds) secondsRef.current.focus()
          else minutesRef.current.focus()
        }
      }
    }
  }

  const getFormateOutput = () => {
    let outputValue = `${hoursRef.current.value}:${minutesRef.current.value}`
    if (isIncludesSeconds) {
      outputValue += secondsRef.current.value
    }
    if (!is24Hours) {
      outputValue += ' ' + selectRef.current.value
    }
    return outputValue
  }

  const getAllEnteredValues = () => {
    if (
      hoursRef.current.value.length === 2 &&
      minutesRef.current.value.length === 2
    ) {
      if (!is24Hours) {
        if (selectRef.current.value.length === 2) {
          if (isIncludesSeconds) {
            if (secondsRef.current.value.length === 2) {
              return true
            } else {
              return false
            }
          }
          return true
        } else {
          return false
        }
      }
      if (isIncludesSeconds) {
        if (secondsRef.current.value.length === 2) {
          return true
        } else {
          return false
        }
      }
      return true
    } else {
      return false
    }
  }
  const onChangeHRHandler = (event: any) => {
    event.persist()
    if (event.target.value.length < 3) {
      if (event.target.name === 'hours') {
        if (is24Hours) {
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
              if (isIncludesSeconds) secondsRef.current.focus()
              else if (!is24Hours) selectRef.current.focus()
            } else {
              secondsRef.current.value = `0${event.target.value}`
              if (!is24Hours) selectRef.current.focus()
            }
          }
        } else {
          if (event.target.name === 'minutes') {
            if (isIncludesSeconds) secondsRef.current.focus()
            else if (!is24Hours) selectRef.current.focus()
          } else {
            if (!is24Hours) selectRef.current.focus()
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
        if (event.target.value[0] !== '0') {
          minutesRef.current.value = minutesRef.current.value.substring(1)
        } else {
          minutesRef.current.value = minutesRef.current.value.substring(0, 2)
        }
        if (isIncludesSeconds) secondsRef.current.focus()
        else if (!is24Hours) selectRef.current.focus()
      } else if (event.target.name === 'seconds') {
        if (event.target.value[0] !== '0') {
          secondsRef.current.value = secondsRef.current.value.substring(1)
        } else {
          secondsRef.current.value = secondsRef.current.value.substring(0, 2)
        }
        if (!is24Hours) selectRef.current.focus()
      }
    }
    if (getAllEnteredValues()) {
      props.onChange(getFormateOutput())
    }
  }

  const onSelectValue = () => {
    if (getAllEnteredValues()) {
      props.onChange(getFormateOutput())
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
              hoursPlaceholder === undefined ? 'HH' : hoursPlaceholder
            }
            className={`${timepickerStyles.timepicker__input} ${
              inputClass || ''
            }`}
            style={{ ...(inputStyles || {}) }}
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
              minutesPlaceholder === undefined ? 'MM' : minutesPlaceholder
            }
            className={`${timepickerStyles.timepicker__input} ${
              inputClass || ''
            }`}
            style={{ ...(inputStyles || {}) }}
            // onKeyPress={onkeyPressonlyNumbersAccept}
            onChange={onChangeHRHandler}
            onKeyDown={onKeyDownCheck}
          />
        </div>
        {isIncludesSeconds && (
          <div>
            <Input
              type='text'
              refChild={secondsRef}
              name='seconds'
              placeholder={
                secondsPlaceholder === undefined ? 'SS' : secondsPlaceholder
              }
              className={`${timepickerStyles.timepicker__input} ${
                inputClass || ''
              }`}
              style={{ ...(inputStyles || {}) }}
              // onKeyPress={onkeyPressonlyNumbersAccept}
              onKeyDown={onKeyDownCheck}
              onChange={onChangeHRHandler}
            />
          </div>
        )}
        {!is24Hours && (
          <div>
            <SelectAmPm
              refChild={selectRef}
              name='selectAMPM'
              data={selectOptions || defaultOptions}
              style={{ ...(selectStyle || {}) }}
              className={`${timepickerStyles.timepicker__select} ${
                inputClass || ''
              }`}
              onSelect={onSelectValue}
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
