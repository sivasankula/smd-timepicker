import React, { useEffect } from 'react'
import timepickerStyles from '../styles.module.css'

interface Props {
  renderData: any
  refValue: any
  isOpenFor: string
  onClick: (value: string) => void
  onMouseOut: (value: string) => void
  onMouseOver: (value: string) => void
}

function SelectValues(props: Props) {
  useEffect(() => {
    let multipleValue = 24
    if (props.isOpenFor === 'hours'){
      if (+props.refValue === 1) {
        multipleValue = 0
      } else if(+props.refValue <= 2) {
        multipleValue = 12
      } else if (+props.refValue <= 3) {
        multipleValue = 17
      } else if (+props.refValue <= 4) {
        multipleValue = 19
      } else if (+props.refValue >= 5 && +props.refValue <= 12 ) {
        multipleValue = 20
      } else {
        multipleValue = 23
      }
    } else {
      multipleValue = +props.refValue < 21 ? 24 : 24
    }
    if (props.refValue) {
      const dataEle = document.getElementById('scrolContainer')
      if (dataEle) {
        dataEle.scroll({ behavior: 'smooth', top: +props.refValue * multipleValue })
      }
    }
  }, [props.refValue])
  
  return (
    <div id='scrolContainer' className={timepickerStyles.custom__select__input}>
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
