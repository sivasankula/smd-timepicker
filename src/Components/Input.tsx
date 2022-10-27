import React, { useEffect, useState } from 'react'
import {
  hoursOptions12,
  hoursOptions24,
  minsOrSeconds
} from '../Constants/DefaultData.enum'
import timepickerStyles from '../styles.module.css'
import SelectValues from './SelectValues'

interface Props {
  onChange: (e: any) => void
  onKeyDown: (e: any) => void
  onManuallySelect: () => void
  type: string
  refChild: any
  placeholder: string
  className: any
  style: any
  name: string
  id: string
  is24: boolean
  isRemoveInputSelector: boolean
}

const Input = (props: Props) => {
  const [isDirtyIn, setIsDirtyIn] = useState(false)
  const [openPicker, setOpenPicker] = useState(false)
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
    e.persist()
    if (!isInside) {
      setOpenPicker(false)
    }
    if (
      props.refChild.current.value.length === 1 ||
      props.refChild.current.value === ''
    ) {
      if (!isInside) {
        setIsDirtyIn(true)
      }
    } else {
      if (!isInside) {
        setIsDirtyIn(false)
      }
    }
    if (props.refChild.current.value.length === 2) {
      if (!isInside) {
        setOpenPicker(false)
      }
    }
  }

  const onFocusHandler = (e: any) => {
    e.persist()
    setRenderData([...fetchRenderData])
    setOpenPicker(true)
  }

  const onChangeHandler = (e: any) => {
    e.persist()
    props.onChange(e)
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
    }
  }

  const onSelectValueClickHandler = (value: string) => {
    props.refChild.current.value = value
    setOpenPicker(false)
    setIsDirtyIn(false)
    props.onManuallySelect()
  }

  const onSelectValueMouseOutHandler = (value: string) => {
    setIsInside(false)
    const docData = document.getElementById(value)
    if (docData) {
      if (docData.style.backgroundColor !== 'rgb(63, 63, 255)') {
        docData.style.backgroundColor = 'white'
      }
    }
  }

  const onSelectValueMouseOverHandler = (value: string) => {
    setIsInside(true)
    const docData = document.getElementById(value)
    if (docData) {
      if (docData.style.backgroundColor !== 'rgb(63, 63, 255)') {
        docData.style.backgroundColor = 'lightblue'
      }
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
        className={`${props.className} ${
          isDirtyIn && timepickerStyles.err__input
        }`}
        style={{ ...props.style }}
        onChange={onChangeHandler}
        onKeyPress={onkeyPressonlyNumbersAccept}
        onKeyDown={props.onKeyDown}
        onBlur={onBlurInput}
        onFocus={onFocusHandler}
      />
      {!props.isRemoveInputSelector && (
        <div>
          {openPicker && (
            <SelectValues
              renderData={renderData}
              refChild={props.refChild}
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
