import React, { useEffect, useState } from 'react'
import {
  hoursOptions12,
  hoursOptions24,
  minsOrSeconds
} from '../Constants/DefaultData.enum'
// import timepickerStyles from '../styles.module.css'
import SelectValues from './SelectValues'

interface Props {
  onChange: (e: any, isValid: boolean) => void
  onKeyDown: (e: any) => void
  onManuallySelect: () => void
  type: string
  refChild: any
  placeholder: string
  className: string
  style: React.CSSProperties
  name: string
  id: string
  is24: boolean
  isRemoveInputSelector: boolean
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

const Input = (props: Props) => {
  // const [isDirtyIn, setIsDirtyIn] = useState(false)
  const [openPicker, setOpenPicker] = useState(false)
  const [isOpenFor, setIsOpenFor] = useState('')
  const [renderData, setRenderData] = useState<any>([])
  const [isInside, setIsInside] = useState(false)
  const [fetchRenderData, setFetchRenderData] = useState<any>([])

  useEffect(() => {
    const rendData =
      props.id === 'hours'
        ? props.is24
          ? hoursOptions24
          : hoursOptions12
        : minsOrSeconds
    setRenderData(rendData)
    setFetchRenderData(rendData)
  }, [])

  const onkeyPressonlyNumbersAccept = (event: any) => {
    event.persist()
    if (!(event.charCode >= 48 && event.charCode <= 57)) {
      event.preventDefault()
    }
  }

  const onBlurInput = (e: any) => {
    if (props.refChild.current.value.length === 2) {
      if (!isInside) {
        setOpenPicker(false)
      }
    } else {
      setTimeout(() => {
        setOpenPicker(false)
      }, 400)
    }
    e.persist()
    if (
      props.refChild.current.value.length === 1 ||
      props.refChild.current.value === ''
    ) {
      if (!isInside) {
        // setIsDirtyIn(true)
        if (props.refChild.current.value.length === 1) {
          props.refChild.current.value = `0${props.refChild.current.value}`
          if (props.name === 'hours') {
            if (!props.is24) {
              props.refChild.current.value = `01`
            }
          }
        }
      }
    } else {
      if (!isInside) {
        // setIsDirtyIn(false)
      }
    }
    setIsInside(false)
  }

  const onFocusHandler = (e: any) => {
    e.persist()
    setRenderData([...fetchRenderData])
    setOpenPicker(true)
    setIsOpenFor(e.target.name)
  }

  const onChangeHandler = (e: any) => {
    e.persist()
    if (e.target.value.length === 1) {
      setRenderData(
        fetchRenderData.filter(
          (Fitem: any) =>
            Fitem.value[0] === e.target.value ||
            Fitem.value[1] === e.target.value
        )
      )
    }
    if (e.target.value.length === 2) {
      setOpenPicker(false)
      // setIsDirtyIn(false)
    }
    let isValidPastd = true
    if (e.target.value === '') {
      setRenderData([...fetchRenderData])
    }
    if (isNaN(e.target.value)) {
      isValidPastd = false
    }
    props.onChange(e, isValidPastd)
  }

  const onSelectValueClickHandler = (value: string) => {
    props.refChild.current.value = value
    setOpenPicker(false)
    // setIsDirtyIn(false)
    props.onManuallySelect()
  }

  const onSelectValueMouseOutHandler = (value: string) => {
    setIsInside(false)
    const docData = document.getElementById(value)
    if (docData) {
      if (
        docData.style.backgroundColor !==
        (props.timeSelectConfig?.selectSpecificData?.isSelectedBGcolor ||
          'rgb(63, 63, 255)')
      ) {
        docData.style.backgroundColor =
          props.timeSelectConfig?.timeInsideContainer?.backgroundColor ||
          'white'
        docData.style.color =
          props.timeSelectConfig?.timeInsideContainer?.color || 'black'
      }
    }
  }

  const onSelectValueMouseOverHandler = (value: string) => {
    setIsInside(true)
    const docData = document.getElementById(value)
    if (docData) {
      if (
        docData.style.backgroundColor !==
        (props.timeSelectConfig?.selectSpecificData?.isSelectedBGcolor ||
          'rgb(63, 63, 255)')
      ) {
        docData.style.backgroundColor =
          props.timeSelectConfig?.selectSpecificData?.isHoveredBGcolor ||
          'lightblue'
        docData.style.color =
          props.timeSelectConfig?.selectSpecificData?.isHoveredFontColor ||
          'black'
      }
    }
  }

  const onKeyDownValidate = (e: any) => {
    e.persist()
    if (e.key === 'ArrowUp') {
      if (
        (e.target.name !== 'hours' &&
          e.target.value !== '' &&
          +e.target.value > 0) ||
        (e.target.name === 'hours' &&
          e.target.value !== '' &&
          +e.target.value > 1) ||
        (e.target.name === 'hours' &&
          e.target.value !== '' &&
          +e.target.value > 0 &&
          props.is24)
      ) {
        let data: any = +e.target.value - 1
        if (JSON.stringify(data).length === 1) {
          data = `0${data}`
        }
        props.refChild.current.value = data
        setRenderData([...fetchRenderData])
        props.onManuallySelect()
      }
    } else if (e.key === 'ArrowDown') {
      if (
        +e.target.value >= 0 &&
        ((+e.target.value < 59 && e.target.name !== 'hours') ||
          (+e.target.value < 23 && e.target.name === 'hours' && props.is24) ||
          (+e.target.value < 12 && e.target.name === 'hours' && !props.is24))
      ) {
        let data: any = +e.target.value + 1
        if (JSON.stringify(data).length === 1) {
          data = `0${data}`
        }
        if (e.target.value === '') {
          if (e.target.name === 'hours') {
            if (props.is24) {
              data = '00'
              console.log('onsidee')
            }
          } else {
            data = '00'
          }
        }
        props.refChild.current.value = data
        setRenderData([...fetchRenderData])
        props.onManuallySelect()
      }
    } else {
      if (e.key === 'ArrowRight') {
        if (e.target.name === 'hours') {
          setOpenPicker(false)
        } else if (e.target.name === 'minutes') {
          setOpenPicker(false)
        } else if (e.target.name === 'seconds') {
          if (!props.is24) {
            setOpenPicker(false)
          }
        }
      } else if (e.key === 'ArrowLeft') {
        if (e.target.name === 'minutes') {
          setOpenPicker(false)
        } else if (e.target.name === 'seconds') {
          setOpenPicker(false)
        } else if (e.target.name === 'selectAMPM') {
        }
      } else if (e.key === 'Backspace') {
      }
      props.onKeyDown(e)
    }
  }

  return (
    <div>
      <input
        id={props.name}
        type={props.type}
        name={props.name}
        ref={props.refChild}
        placeholder={props.placeholder}
        className={`${props.className}`}
        style={{ ...props.style }}
        onChange={onChangeHandler}
        onKeyPress={onkeyPressonlyNumbersAccept}
        onKeyDown={onKeyDownValidate}
        onBlur={onBlurInput}
        onFocus={onFocusHandler}
        onPaste={(e: any) => {
          e.persist()
          props.refChild.current.value = ''
        }}
      />
      {!props.isRemoveInputSelector && (
        <div>
          {openPicker && (
            <SelectValues
              isOpenFor={isOpenFor}
              renderData={renderData}
              refValue={props.refChild.current.value}
              timeSelectConfig={props.timeSelectConfig || {}}
              onClick={onSelectValueClickHandler}
              onMouseOut={onSelectValueMouseOutHandler}
              onMouseOver={onSelectValueMouseOverHandler}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Input
