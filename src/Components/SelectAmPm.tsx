import React, { useState } from 'react'
import { defaultOptions } from '../Constants/DefaultData.enum'
// import timepickerStyles from '../styles.module.css'

interface Props {
  data: any
  refChild: any
  name: string
  className: any
  style: any
  onKeyDown: (e: any) => void
  // onChange: (e: any) => void
  onSelect: (e: any) => void
}

const SelectAmPm = (props: Props) => {
  const data = props.data.length ? props.data : defaultOptions
  const [selectedOption, setSelectedOption] = useState('')
  const [optionsList, setOptionsList] = useState(data)

  const onSelectingValue = (e: any) => {
    if (e.target.value !== '') {
      console.log(e)
      setOptionsList(data.filter((fItem: any) => fItem.value !== ''))
      setSelectedOption(e.target.value)
      console.log('from selct', props.refChild.current.value)
      props.onSelect(props.refChild.current.value)
    }
  }

  return (
    <select
      ref={props.refChild}
      onChange={onSelectingValue}
      onKeyDown={props.onKeyDown}
      className={props.className}
      style={props.style}
      name={props.name}
      value={selectedOption}
    >
      {optionsList.map((item: any) => (
        <option key={Math.random().toString()} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  )
}

export default SelectAmPm
