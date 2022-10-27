import React, { useEffect, useState } from 'react'
import {
  hoursOptions12,
  hoursOptions24,
  minsOrSeconds
} from '../Constants/DefaultData.enum'
import './Index.css'
// import timepickerStyles from '../styles.module.css'

interface Props {
  onChange: (e: any) => void
  onKeyDown: (e: any) => void
  type: string
  refChild: any
  placeholder: string
  className: any
  style: any
  name: string
  id: string
  is24: boolean
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
    // console.log(renderData, rendData)
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
  }

  const onFocusHandler = (e: any) => {
    e.persist()
    setRenderData([...fetchRenderData])
    setOpenPicker(true)
    // console.log(e)
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
  }

  return (
    <div>
      <input
        id={props.name}
        type={props.type}
        name={props.name}
        ref={props.refChild}
        placeholder={props.placeholder}
        className={`${props.className}`}
        style={{
          ...props.style,
          border: isDirtyIn ? '4px solid red' : '',
          borderRadius: isDirtyIn ? '3px' : '',
          backgroundColor: isDirtyIn ? 'rgb(253, 180, 180)' : ''
        }}
        onChange={onChangeHandler}
        onKeyPress={onkeyPressonlyNumbersAccept}
        onKeyDown={props.onKeyDown}
        onBlur={onBlurInput}
        onFocus={onFocusHandler}
      />
      {openPicker && (
        <div
          style={{
            width: '30px',
            border: '2px solid black',
            height: '100px',
            marginLeft: '3px',
            overflow: 'auto'
          }}
        >
          <div style={{ height: '100%' }}>
            {renderData.map((item: any) => (
              <div
                id={`${item.value}`}
                onMouseOut={() => {
                  setIsInside(false)
                  // e.persist()
                  // console.log(e, 'mouse out')
                  const docData = document.getElementById(item.value)
                  if (docData) {
                    if (docData.style.backgroundColor !== 'green') {
                      docData.style.backgroundColor = 'white'
                    }
                  }
                  // setOpenPicker(false)
                }}
                onMouseOver={() => {
                  setIsInside(true)
                  // e.persist()
                  // console.log(e, 'mouse mooved')
                  const docData = document.getElementById(item.value)
                  if (docData) {
                    if (docData.style.backgroundColor !== 'green') {
                      docData.style.backgroundColor = 'lightgreen'
                    }
                  }
                  // setOpenPicker(true)
                }}
                style={{
                  border: '1px solid green',
                  margin: '1px 0',
                  cursor: 'pointer',
                  textAlign: 'center',
                  backgroundColor:
                    props.refChild.current.value === item.value
                      ? 'green'
                      : 'white'
                }}
                key={item.value}
                onClick={() => {
                  props.refChild.current.value = item.value
                  console.log('clicking p', item.value)
                  setOpenPicker(false)
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Input
