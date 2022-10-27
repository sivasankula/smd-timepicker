import React from 'react'
import timepickerStyles from '../styles.module.css'

interface Props {
  renderData: any
  refChild: any
  onClick: (value: string) => void
  onMouseOut: (value: string) => void
  onMouseOver: (value: string) => void
}

function SelectValues(props: Props) {
  return (
    <div className={timepickerStyles.custom__select__input}>
      <div>
        {props.renderData.map((item: any) => (
          <div
            id={`${item.value}`}
            className={`${timepickerStyles.timeValue__container}`}
            style={{
              backgroundColor:
                props.refChild.current.value === item.value
                  ? '#3f3fff'
                  : 'white'
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
