import React, { useState } from 'react'
import { defaultOptions } from '../Constants/DefaultData.enum'
// import timepickerStyles from '../styles.module.css'

interface Props {
  id: string
  data: any
  refChild: any
  name: string
  className: any
  style: any
  onKeyDown: (e: any) => void
  onSelect: (e?: any) => void
}

const SelectAmPm = (props: Props) => {
  const data = props.data.length ? props.data : defaultOptions
  const [selectedOption, setSelectedOption] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  // const [optionsList, setOptionsList] = useState(data)

  const onSelectingValue = (e: any) => {
    // setOptionsList(data.filter((fItem: any) => fItem.value !== ''))
    setSelectedOption(e.target.value)
    props.onSelect(e.target.value)
  }

  const onBlurSelectValue = (e: any) => {
    e.persist()
    if (e.target.value === '') {
      setIsDirty(true)
    } else {
      setIsDirty(false)
    }
  }

  return (
    <select
      id={props.id}
      ref={props.refChild}
      onChange={onSelectingValue}
      onKeyDown={props.onKeyDown}
      className={`${props.className}`}
      style={{
        ...props.style,
        width: '52px',
        height: '25px',
        border: isDirty ? '4px solid red' : '',
        borderRadius: isDirty ? '3px' : '',
        backgroundColor: isDirty ? 'rgb(253, 180, 180)' : ''
      }}
      name={props.name}
      value={selectedOption}
      onBlur={onBlurSelectValue}
      onFocus={(e) => {
        console.log(e, 'ffffselect')
      }}
    >
      {data.map((item: any) => (
        <option key={Math.random().toString()} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  )
}

export default SelectAmPm
