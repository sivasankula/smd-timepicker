import React, { useState } from 'react'
import timepickerStyles from '../styles.module.css'

interface Props {
  onChange: (e: any) => void
  onKeyDown: (e: any) => void
  type: string
  refChild: any
  placeholder: string
  className: any
  style: any
  name: string
}

const Input = (props: Props) => {
  const [isDirtyIn, setIsDirtyIn] = useState(false)
  const onkeyPressonlyNumbersAccept = (event: any) => {
    event.persist()
    // console.log(event)
    if (!(event.charCode >= 48 && event.charCode <= 57)) {
      event.preventDefault()
    }
  }

  const onBlurInput = (e: any) => {
    e.persist()
    // console.log(e, 'blur', e.target.name)
    if (
      props.refChild.current.value.length === 1 ||
      props.refChild.current.value === ''
    ) {
      setIsDirtyIn(true)
    } else {
      setIsDirtyIn(false)
    }
  }

  return (
    <input
      type={props.type}
      name={props.name}
      ref={props.refChild}
      placeholder={props.placeholder}
      className={`${props.className} ${
        isDirtyIn && timepickerStyles.err__input
      }`}
      style={props.style}
      onChange={props.onChange}
      onKeyPress={onkeyPressonlyNumbersAccept}
      onKeyDown={props.onKeyDown}
      onBlur={onBlurInput}
    />
  )
}

export default Input
