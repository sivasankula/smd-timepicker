import React, { useEffect, useState } from 'react'
import timePickerStyles from '../styles.module.css'

interface SelectProps {
  data: {
    name: string
    value: string
  }[]
  selectAMPMStyles: React.CSSProperties
  selectAMPMClass: string
  selectOptions: {
    name: string
    value: string
  }[]
  onRecieveTime: (select: string) => void
  actualTime: string
}

const Select = (props: SelectProps) => {
  const [amPm, setAmPm] = useState('')
  const onSelectHandler = (e: any) => {
    e.persist()
    setAmPm(e.target.value)
    if (e.target.value) props.onRecieveTime(e.target.value)
  }

  useEffect(() => {
    setAmPm(props.actualTime)
  }, [props.actualTime])

  return (
    <div>
      <select
        className={timePickerStyles.select__am}
        onChange={onSelectHandler}
        value={amPm}
      >
        {props.data.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
