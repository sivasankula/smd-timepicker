import React, { useEffect } from 'react'
import timepickerStyles from '../styles.module.css'

interface Props {
  renderData: any
  refValue: any
  isOpenFor: string
  timeSelectConfig?: {
    timeOuterContainer?: React.CSSProperties
    timeInsideContainer?: React.CSSProperties
    selectSpecificData?: {
      isSelectedBGcolor?: string
      isHoveredBGcolor?: string
      isSelectedFontColor?: string
      isHoveredFontColor?: string
    }
  }
  onClick: (value: string) => void
  onMouseOut: (value: string) => void
  onMouseOver: (value: string) => void
}

function SelectValues(props: Props) {
  useEffect(() => {
    const multipleValue = 26
    if (props.refValue) {
      const dataEle = document.getElementById('scrolContainer')
      if (dataEle) {
        dataEle.scroll({
          behavior: 'smooth',
          top: +props.refValue * multipleValue - 26
        })
      }
    }
  }, [props.refValue])

  return (
    <div
      id='scrolContainer'
      style={props.timeSelectConfig?.timeOuterContainer || {}}
      className={timepickerStyles.time__picker__inputS__selector}
    >
      {props.renderData.map((item: any) => (
        <div
          id={`${item.value}`}
          className={`${timepickerStyles.time__picker__input__selector__value}`}
          style={{
            ...props.timeSelectConfig?.timeInsideContainer,
            color:
              props.refValue === item.value
                ? props.timeSelectConfig?.selectSpecificData
                    ?.isSelectedFontColor || 'black'
                : props.timeSelectConfig?.timeInsideContainer?.color || 'black',
            backgroundColor:
              props.refValue === item.value
                ? props.timeSelectConfig?.selectSpecificData
                    ?.isSelectedBGcolor || 'lightgreen'
                : props.timeSelectConfig?.timeInsideContainer
                    ?.backgroundColor || 'white'
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
  )
}

export default SelectValues
