# smd-timepicker

> React time picker with custom configurations
> --> Provides all the necessary styling and user friendly interaction, 
> --> Can able to modify the existing styling as well as can able to add custome css also.
> --> 24 hours format as well as 12 hours format 
> --> Easy to understand, given below gif

[![NPM](https://img.shields.io/npm/v/smd-timepicker.svg)](https://www.npmjs.com/package/smd-timepicker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save smd-timepicker
```

## Usage

```tsx
import React, { Component } from 'react'

import SMDTimePicker  from 'smd-timepicker'
import 'smd-timepicker/dist/index.css'

class Example extends Component {
  render() {
    return <SMDTimePicker onChange={onSelectingTime}/>
  }
}
```
## props
```
 ________________________________________________________________________
|     Prop         |  Default Value(type)  |   Description               |
|________________________________________________________________________|
|                  |                       |                             |
|   onChange       |  onChange: (e: any)   | Captures the output in the  |
|                  |     => void           | format of hh:mm a           |
|                  |                       |                             |
|________________________________________________________________________|
|                  |                       |                             |
|    format        |   hh:mm a             | can able to pass the format |
|                  |                       | like hh:mm a or HH:mm       |
|                  |                       |                             |
|________________________________________________________________________|
|                  |                       |                             |
|                  |                       | if want pass default        |
|   value          |  "" (string)          |  as hh:mm a format or       |
|                  |                       |   HH:mm format              |
|                  |                       |                             |
|________________________________________________________________________|
|                  |                       |                             |
|  is24Hours       |  false (Boolean)      | if we want 24 hrs formate   |
|                  |                       |   then set this to true     |
|                  |                       |                             |
|________________________________________________________________________|
|                  |                       |                             |
| isIncludesSeconds|  false {Boolean)      | if you want seconds  also   |
|                  |                       |                             |
|________________________________________________________________________|
|                  |                       |                             |
| hoursPlaceholder |  `HH` {string)        | for hours input             |
|                  |                       |                             |
|________________________________________________________________________|
|                  |                       |                             |
|minutesPlaceholder|  **MM** {string)      | for minutes input           |
|                  |                       |                             |
|________________________________________________________________________|
|                  |                       |                             |
|secondsPlaceholder|  SS {string)          | for seconds input           |
|                  |                       |                             |
|________________________________________________________________________|
|                  |                       |                             |
|   inputStyles    |  {...} (styles object)| use inline styles for input |
|                  |                       |                             |
|________________________________________________________________________|
|                  |                       |                             |
|   inputClass     |  "" (className)       | can able to provide css     |
|                  |                       |                             |
|________________________________________________________________________|
|                  |                       |                             |
|   selectStyle    |  {...} (styles object)| use inline styles for select|
|                  |                       |                             |
|________________________________________________________________________|
|                  |                       |                             |
|   selectClass    |  "" (className)       | can able to provide css     |
|                  |                       |                             |
|________________________________________________________________________|
|                  |                       |                             |
|  selectOptions   |[{name:'',value:''},..]| AM PM select options can be |
|                  |                       | set using this prop         |
|                  |                       |                             |
|________________________________________________________________________|
```


### keywords
    time-picker smd-timepicker custome-timepicker 

## License

 © [sivasankula19](https://github.com/sivasankula19)


