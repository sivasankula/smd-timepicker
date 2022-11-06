import React, { useEffect } from 'react'
import timePickerStyles from '../styles.module.css'

interface Props {
  onSelectingAValue: (value: string) => void
  onMouseInside: () => void
  onMouseOutSide: () => void
  renderData: {
    name: string
    value: string
  }[]
  selectedTime: string
  selectedFor: string
  timeSelectConfig?: {
    timeDropDownStyles?: React.CSSProperties
    timeInsideContainer?: React.CSSProperties
    selectSpecificData?: {
      isSelectedBGcolor?: string
      isSelectedFontColor?: string
      isHoveredBGcolor?: string
      isHoveredFontColor?: string
    }
  }
}

function SelectValues(props: Props) {
  useEffect(() => {
    console.log('inside useeff', props.selectedTime)
    let multipleValue = 24
    if (props.selectedFor === 'hours') {
      if (+props.selectedTime === 1) {
        multipleValue = 0
      } else if (+props.selectedTime <= 2) {
        multipleValue = 12
      } else if (+props.selectedTime <= 3) {
        multipleValue = 17
      } else if (+props.selectedTime <= 4) {
        multipleValue = 19
      } else if (+props.selectedTime >= 5 && +props.selectedTime <= 12) {
        multipleValue = 20
      } else {
        multipleValue = 23
      }
    } else {
      multipleValue = 26
    }
    const dataEle = document.getElementById('scrollContainer')
    if (dataEle) {
      console.log('inside data cont')
      dataEle.scroll({
        behavior: 'smooth',
        top: +props.selectedTime * multipleValue
      })
    }
  }, [props.selectedTime])

  const onMouseEnterHandler = (value: string) => {
    const currentEl = document.getElementById(value)

    if (currentEl) {
      if (
        currentEl.style.backgroundColor !==
        (props.timeSelectConfig?.selectSpecificData?.isSelectedBGcolor ||
          'lightblue')
      ) {
        currentEl.style.backgroundColor =
          props.timeSelectConfig?.selectSpecificData?.isHoveredBGcolor || 'red'
        currentEl.style.color =
          props.timeSelectConfig?.selectSpecificData?.isHoveredFontColor ||
          'black'
      }
    }
  }

  const onMouseLeaveHandler = (value: string) => {
    const currentEl = document.getElementById(value)
    if (currentEl) {
      if (
        currentEl.style.backgroundColor !==
        (props.timeSelectConfig?.selectSpecificData?.isSelectedBGcolor ||
          'lightblue')
      ) {
        currentEl.style.backgroundColor =
          props.timeSelectConfig?.timeInsideContainer?.backgroundColor ||
          'white'
        currentEl.style.color =
          props.timeSelectConfig?.timeInsideContainer?.color || 'black'
      }
    }
  }

  return (
    <div
      id='scrollContainer'
      style={props.timeSelectConfig?.timeDropDownStyles}
      className={timePickerStyles.time__picker__inputS__selector}
      onMouseEnter={() => {
        props.onMouseInside()
      }}
      onMouseLeave={() => {
        props.onMouseOutSide()
      }}
    >
      {props.renderData.map((item) => (
        <div
          key={item.value}
          id={item.value}
          style={{
            ...props.timeSelectConfig?.timeInsideContainer,
            backgroundColor:
              item.value === props.selectedTime
                ? props.timeSelectConfig?.selectSpecificData?.isSelectedBGcolor
                : props.timeSelectConfig?.timeInsideContainer
                    ?.backgroundColor || 'white',
            color:
              item.value === props.selectedTime
                ? props.timeSelectConfig?.selectSpecificData
                    ?.isSelectedFontColor
                : props.timeSelectConfig?.timeInsideContainer?.color || 'black'
          }}
          className={timePickerStyles.time__picker__input__selector__value}
          onMouseEnter={() => onMouseEnterHandler(item.value)}
          onMouseLeave={() => onMouseLeaveHandler(item.value)}
          onClick={() => props.onSelectingAValue(item.value)}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default SelectValues
