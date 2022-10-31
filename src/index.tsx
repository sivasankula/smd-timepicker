import * as React from 'react'
import Input from './Components/Input'
import SelectAmPm from './Components/SelectAmPm'
import {
  allowed24Formats,
  allowedFormats,
  default24Format,
  defaultFormat,
  defaultOptions
} from './Constants/DefaultData.enum'
import timepickerStyles from './styles.module.css'

interface Props {
  onChange?: (time: string) => void
  format?: string
  value?: string
  is24Hours?: boolean
  removeInputSelector?: boolean
  hoursPlaceholder?: string
  minutesPlaceholder?: string
  isIncludesSeconds?: boolean
  secondsPlaceholder?: string
  inputStyles?: React.CSSProperties
  selectStyle?: React.CSSProperties
  inputClass?: string
  selectClass?: string
  selectOptions?: { name: string; value: string }[]
  timeSelectConfig?: {
    timeOuterContainer?: React.CSSProperties
    timeInsideContainer?: React.CSSProperties
    selectSpecificData?: {
      isSelectedBGcolor: string
      isHoveredBGcolor: string
      isSelectedFontColor: string
      isHoveredFontColor: string
    }
  }
}

let timeFormatGlobal: any = defaultFormat
const SMDTimePicker = (props: Props) => {
  const {
    value = '',
    is24Hours = false,
    // onChange = (e: any) => {},
    hoursPlaceholder = 'HH',
    minutesPlaceholder = 'MM',
    secondsPlaceholder = 'SS',
    isIncludesSeconds = false,
    inputStyles = {},
    selectClass = '',
    selectStyle = {},
    inputClass = '',
    timeSelectConfig = {},
    selectOptions = defaultOptions,
    format = 'hh:mm:ss'
  } = props
  const hoursRef = React.useRef<any>(null)
  const minutesRef = React.useRef<any>(null)
  const secondsRef = React.useRef<any>(null)
  const selectRef = React.useRef<any>(null)
  // const [timeFormat, setTimeFormat] = React.useState(defaultFormat)
  // const minSelectRef = React.useRef<any>(null)
  React.useEffect(() => {
    if (format) {
      if (is24Hours) {
        const getFormatData = allowed24Formats.filter(
          (formatItem: any) => formatItem.format === format
        )
        if (getFormatData.length) {
          // setTimeFormat(getFormatData[0])
          timeFormatGlobal = getFormatData[0]
        } else {
          // setTimeFormat(default24Format)
          timeFormatGlobal = default24Format
        }
      } else {
        const getFormatData = allowedFormats.filter(
          (formatItem: any) => formatItem.format === format
        )
        if (getFormatData.length) {
          // setTimeFormat(getFormatData[0])
          timeFormatGlobal = getFormatData[0]
        }
      }
    }
    console.log(timeFormatGlobal)
  }, [])

  React.useEffect(() => {
    if (value) {
      const Tvalue = value || ''
      if (value.split(' ').length === 2) {
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
        if (isIncludesSeconds) {
          let secondsValue = timeValue[0].split(':')[2]
          secondsValue =
            secondsValue.length === 2
              ? secondsValue
              : secondsValue.length === 1
              ? `0${secondsValue}`
              : '00'
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
        const hoursValue = timeValue[0]
        const minutesValue = timeValue[1]
        if (isIncludesSeconds) {
          const secondsValue = timeValue[2]
          if (secondsRef && secondsRef?.current) {
            secondsRef.current.value = secondsValue
          }
        }
        if (hoursRef && hoursRef?.current) {
          hoursRef.current.value =
            hoursValue.length === 1 ? `0${hoursValue}` : hoursValue
        }
        if (minutesRef && minutesRef?.current) {
          minutesRef.current.value = minutesValue
        }
      }
    }
  }, [value])
  const onKeyDownCheck = (e: any) => {
    e.persist()
    if (e.key === 'ArrowRight') {
      if (e.target.name === 'hours') {
        minutesRef.current.focus()
      } else if (e.target.name === 'minutes') {
        if (isIncludesSeconds) {
          secondsRef.current.focus()
        } else {
          if (!is24Hours) {
            selectRef.current.focus()
          }
        }
      } else if (e.target.name === 'seconds') {
        if (!is24Hours) {
          selectRef.current.focus()
        }
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
        if (
          e.target.value.length === 0 &&
          minutesRef.current.value.length === 2
        ) {
          const valueElement = document.getElementById(
            `${minutesRef.current.value}`
          )
          if (valueElement) {
            valueElement.style.backgroundColor = 'white'
          }
        }
        if (minutesRef.current.value === '') {
          hoursRef.current.focus()
        } else {
          minutesRef.current.focus()
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
      outputValue += ':' + secondsRef.current.value
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
  const onChangeHRHandler = (event: any, isValid: boolean) => {
    event.persist()
    if (
      (event.target.name === 'hours' &&
        +event.target.value > 24 &&
        event.target.value.length > 3) ||
      ((event.target.name === 'minutes' || event.target.name === 'seconds') &&
        +event.target.value > 59 &&
        event.target.value.length > 3) ||
      !isValid
    ) {
      if (event.target.name === 'hours') {
        hoursRef.current.value = ''
        minutesRef.current.focus()
      } else if (event.target.name === 'minutes') {
        minutesRef.current.value = ''
        if (isIncludesSeconds) {
          secondsRef.current.focus()
        } else {
          if (!is24Hours) {
            selectRef.current.focus()
          }
        }
      } else {
        secondsRef.current.value = ''
        if (!is24Hours) {
          selectRef.current.focus()
        }
      }
    } else {
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
                    hoursRef.current.value = `0${hoursRef.current.value[0]}`
                    minutesRef.current.focus()
                  }
                  if (!isGreater) {
                    minutesRef.current.focus()
                  }
                } else {
                  minutesRef.current.focus()
                }
              }
            }
            if (+event.target.value > 23) {
              hoursRef.current.value = ''
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
                    hoursRef.current.value = `0${event.target.value[0]}`
                    minutesRef.current.focus()
                  } else {
                    minutesRef.current.focus()
                  }
                } else if (event.target.value === '00') {
                  hoursRef.current.value = '0'
                } else if (
                  event.target.value.length === 2 &&
                  (event.target.value[1] !== '0' ||
                    event.target.value[1] !== '1')
                ) {
                  if (event.target.value[1] === '0') {
                    hoursRef.current.value = `${event.target.value[1]}`
                  } else {
                    hoursRef.current.value = `0${event.target.value[1]}`
                    minutesRef.current.focus()
                  }
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
          if (event.target.value !== '') {
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
              if (
                event.target.value[0] === '6' ||
                event.target.value[0] === '7' ||
                event.target.value[0] === '8' ||
                event.target.value[0] === '9'
              ) {
                if (event.target.name === 'minutes') {
                  minutesRef.current.value = `0${event.target.value[1]}`
                } else {
                  secondsRef.current.value = `0${event.target.value[1]}`
                }
              }
              if (event.target.name === 'minutes') {
                if (isIncludesSeconds) secondsRef.current.focus()
                else if (!is24Hours) selectRef.current.focus()
              } else {
                if (!is24Hours) selectRef.current.focus()
              }
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
        props.onChange && props.onChange(getFormateOutput())
      }
    }
  }

  const onSelectValue = () => {
    if (getAllEnteredValues()) {
      props.onChange && props.onChange(getFormateOutput())
    }
  }
  const ongetManuallySelectedValue = () => {
    if (getAllEnteredValues()) {
      props.onChange && props.onChange(getFormateOutput())
    }
  }

  return (
    <div>
      <div className={timepickerStyles.timepicker__align}>
        <div>
          <Input
            type='text'
            name='hours'
            id='hours'
            is24={props.is24Hours || false}
            refChild={hoursRef}
            placeholder={
              hoursPlaceholder === undefined ? 'HH' : hoursPlaceholder
            }
            className={`${inputClass || ''} ${
              timepickerStyles.timepicker__input
            }`}
            style={{
              ...(inputStyles || {})
            }}
            onChange={onChangeHRHandler}
            onKeyDown={onKeyDownCheck}
            onManuallySelect={ongetManuallySelectedValue}
            isRemoveInputSelector={props.removeInputSelector || false}
            timeSelectConfig={timeSelectConfig}
          />
        </div>
        <div>
          <Input
            type='text'
            id='minutes'
            is24={props.is24Hours || false}
            refChild={minutesRef}
            name='minutes'
            placeholder={
              minutesPlaceholder === undefined ? 'MM' : minutesPlaceholder
            }
            className={`${inputClass || ''} ${
              timepickerStyles.timepicker__input
            }`}
            style={{
              ...(inputStyles || {})
            }}
            onChange={onChangeHRHandler}
            onKeyDown={onKeyDownCheck}
            onManuallySelect={ongetManuallySelectedValue}
            isRemoveInputSelector={props.removeInputSelector || false}
            timeSelectConfig={timeSelectConfig}
          />
        </div>
        {isIncludesSeconds && (
          <div>
            <Input
              type='text'
              id='seconds'
              refChild={secondsRef}
              name='seconds'
              is24={props.is24Hours || false}
              placeholder={
                secondsPlaceholder === undefined ? 'SS' : secondsPlaceholder
              }
              className={`${inputClass || ''} ${
                timepickerStyles.timepicker__input
              }`}
              style={{
                ...(inputStyles || {})
              }}
              onKeyDown={onKeyDownCheck}
              onChange={onChangeHRHandler}
              onManuallySelect={ongetManuallySelectedValue}
              isRemoveInputSelector={props.removeInputSelector || false}
              timeSelectConfig={timeSelectConfig}
            />
          </div>
        )}
        {!is24Hours && (
          <div>
            <SelectAmPm
              id='selectAMPM'
              refChild={selectRef}
              name='selectAMPM'
              data={selectOptions || defaultOptions}
              style={{ ...(selectStyle || {}), width: '52px', height: '20px' }}
              className={`${selectClass || ''}`}
              onSelect={onSelectValue}
              onKeyDown={onKeyDownCheck}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SMDTimePicker
