import React, { useEffect } from 'react'
import timepickerStyles from '../styles.module.css'

interface Props {
  renderData: any
  refValue: any
  onClick: (value: string) => void
  onMouseOut: (value: string) => void
  onMouseOver: (value: string) => void
}

function SelectValues(props: Props) {
  useEffect(() => {
    console.log(props.refValue)
    if (props.refValue) {
      const dataEle = document.getElementById(`${props.refValue}`)
      if (dataEle) {
        dataEle.scroll({ behavior: 'smooth', top: 300 })
      }
    }
  }, [])
  return (
    <div className={timepickerStyles.custom__select__input}>
      <div>
        {props.renderData.map((item: any) => (
          <div
            id={`${item.value}`}
            className={`${timepickerStyles.timeValue__container}`}
            style={{
              backgroundColor:
                props.refValue === item.value ? '#3f3fff' : 'white'
            }}
            key={item.value}
            onMouseOut={() => {
              props.onMouseOut(item.value)
            }}
            onMouseOver={() => {
              props.onMouseOver(item.value)
            }}
            onClick={() => {
              props.onClick(item.value)
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectValues
