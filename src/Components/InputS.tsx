import React, { useEffect, useRef, useState } from 'react'
import timePickerStyles from '../styles.module.css'
import SelectValues from './SelectValues'

interface InputSProps {
  name: string
  is24: boolean
  placeHolder: string
  className: string
  renderData: {
    name: string
    value: string
  }[]
  timeValue: string
  inputStyle: React.CSSProperties
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
  onSendingData: (time: string, currentData: string) => void
}

const InputS = (props: InputSProps) => {
  const [time, setTime] = useState(props.timeValue)
  const [open, setOpen] = useState(false)
  const inputRef = useRef<any>(null)
  const [inside, setInside] = useState(false)
  const [renderData, setRenderData] = useState(props.renderData)

  useEffect(() => {
    if (time) props.onSendingData(time, props.name)
  }, [time])

  useEffect(() => {
    setTime(props.timeValue)
  }, [props.timeValue])

  const onChangeHandler = (event: any) => {
    const { value, name } = event.target
    event.persist()
    if (value.length < 3 && value !== '') {
      if (name === 'hours') {
        if (props.is24) {
          if (value[0] === '0' || value[0] === '1' || value[0] === '2') {
            if (value[0] === '2' && value.length === 2) {
              if (+value[1] < 4) {
                setTime(value)
              } else {
                setTime(`02`)
              }
            } else {
              setTime(value)
            }
          } else {
            setTime(`0${value}`)
          }
        } else {
          if (value[0] === '0') {
            setTime(value)
          } else {
            if (+value > 0 && +value < 13) {
              if (value[0] === '1') {
                setTime(value)
              } else {
                setTime(`0${value}`)
              }
              // setTime(value)
            } else {
              let data = `${+value - 12}`
              data = data.length === 1 ? `0${data}` : data
              setTime(data)
            }
          }
        }
      } else if (name === 'minutes' || name === 'seconds') {
        if (+value >= 0 && +value < 60) {
          if (
            value[0] === '6' ||
            value[0] === '7' ||
            value[0] === '8' ||
            value[0] === '9'
          ) {
            setTime(`0${value[0]}`)
          } else {
            setTime(value)
          }
        }
      }
    } else {
      if (value === '') {
        setTime(value)
      } else {
        if (value.length >= 3) {
          setTime((prev) => prev)
        } else {
          setTime(value)
        }
      }
    }
  }

  const onKeyPressHandler = (event: any) => {
    event.persist()
    if (!(event.charCode >= 48 && event.charCode <= 57)) {
      event.preventDefault()
    }
  }

  const onKeyDownHandler = (e: any) => {
    const { name, value } = e.target
    e.persist()
    switch (e.key) {
      case 'ArrowDown':
        if (
          +value >= 0 &&
          ((+value < 59 && name !== 'hours') ||
            (+value < 23 && name === 'hours' && props.is24) ||
            (+value < 12 && name === 'hours' && !props.is24))
        ) {
          let data: any = +value + 1
          if (JSON.stringify(data).length === 1) {
            data = `0${data}`
          }
          if (value === '') {
            if (name === 'hours') {
              if (props.is24) {
                data = '00'
              }
            } else {
              data = '00'
            }
          }
          setTime(`${data}`)
        }
        break
      case 'ArrowUp':
        if (
          (name !== 'hours' && value !== '' && +value > 0) ||
          (name === 'hours' && value !== '' && +value > 1) ||
          (name === 'hours' && value !== '' && +value > 0 && props.is24)
        ) {
          let data: any = +value - 1
          if (JSON.stringify(data).length === 1) {
            data = `0${data}`
          }
          setTime(`${data}`)
        }
        break
      case 'ArrowRight':
        break
      case 'ArrowLeft':
        break
      case 'Backspace':
        break
      default:
        break
    }
  }

  const onBlurHandler = (e: any) => {
    e.persist()
    if (!inside) {
      setOpen(false)
    } else {
      setTimeout(() => {
        setOpen(false)
      }, 400)
    }
    console.log(inside)
  }

  const onFocusHandler = (e: any) => {
    e.persist()
    setRenderData((prev) => [...prev])
    setOpen(true)
  }

  const onPasetHandler = (e: any) => {
    e.persist()
  }

  const onSelectManual = (value: string) => {
    setTime(value)
    setOpen(false)
  }

  return (
    <div>
      <input
        type='text'
        placeholder={props.placeHolder}
        name={props.name}
        value={time}
        ref={inputRef}
        className={`${props.className} ${timePickerStyles.time__picker__inputS}`}
        style={props.inputStyle}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        onKeyPress={onKeyPressHandler}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        onPaste={onPasetHandler}
      />
      {open && (
        <SelectValues
          onSelectingAValue={onSelectManual}
          onMouseInside={() => setInside(true)}
          onMouseOutSide={() => setInside(false)}
          selectedTime={time}
          selectedFor={props.name}
          timeSelectConfig={props.timeSelectConfig}
          renderData={renderData}
        />
      )}
    </div>
  )
}

export default InputS
