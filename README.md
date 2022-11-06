# smd-timepicker

> React time picker with custom configurations
> --> Provides all the necessary stylling and user friendly interaction,
> --> Can able to modify the existing styling as well as can able to add custome css also.
> --> 24 hours format as well as 12 hours format.
> --> Easy to understand, given below gif


[![NPM](https://img.shields.io/npm/v/smd-timepicker.svg)](https://www.npmjs.com/package/smd-timepicker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install smd-timepicker
```

## Usage

```tsx
import React, { Component } from 'react'

import SMDTimePicker  from 'smd-timepicker'

class Example extends Component {
  render() {
    return <SMDTimePicker value='10:25 am' onChange={onSelectingTime}/>
  }
}
```
## props

| Prop				  | Default Value & Type 				 | Description  |
| :------------: |:---------------:| :---------------:|
|    *onChange*   | onChange: (time: string) => void (function)| Captures the output in the  format of user provided prop format or default format (`hh:mm a`)|
|						|								|											|
| *format*   			|  `hh:mm a`  (string)     		 |   Can able to pass the format like hh:mm a or HH:mm  |
|						|									|											|
| 		*value* 	 | `''` (string)  				|   If want pass default value as `hh:mm a`  format or `HH:mm` format		 |
|						|									|											|
| 	*is24Hours*  	 | `false` (Boolean)       	 |   If we want 24 hrs format then set this to true|
|						|												|											|
| 	*removeInputSelector*  	 | `false` (Boolean)       	 |  if you don't want Time select options provide this as true |
|						|												|											|
| *hoursPlaceholder*  |  `HH` {string)        | For hours input  placeholder |
|						|												|											|
|*minutesPlaceholder*|  `MM` {string)      | For minutes input placeholder  |
|						|												|											|
| *isIncludesSeconds* |  `false` {Boolean)  		    | If you want seconds  also to be included pass this prop as true value   	 |
|						|												|											|
|*secondsPlaceholder*|  `SS` {string)          | For seconds input placeholder  |
|						|												|											|
|  *inputStyles*   |  `{}` (css styles object)| Set inline styles for input |
|						|												|											|
|   *inputClass*     | ` ''` (className) (css className string)      | Can able to provide our app CSS classes to the inputs |
|						|												|											|
|   *selectStyle*    |  `{}` (css styles object)| Set inline styles for select AM or PM|
|						|												|											|
|   *selectClass*    |  `''` (className)       | Can able to provide our app CSS classes to the select AM or PM|
|						|												|											|
|  *selectOptions*|`[{name:'AM',value:'am'},..]`| If you want to Change the name of select AM or PM as lowercase values or uppercase values or titlesase values, You can obtain those with css styles also  	|
|						|												|											|
|  *timeSelectConfig* | {<br />timeOuterContainer: {},<br /> timeInsideContainer: {} <br /> selectSpecificData: {<br/> isSelectedBGcolor: 'rgb(63, 63, 255)',<br />isSelectedFontColor:'black',<br />isHoveredBGcolor:'lightblue',<br /> isHoveredFontColor: 'black' }</br> }  |  **timeOuterContainer** is to change the custom styles for the select input container,  **timeInsideContainer** is to time data value inside container  , **selectSpecificData** this object is to activated element styles 	|



## License

 © [sivasankula19](https://github.com/sivasankula19)


