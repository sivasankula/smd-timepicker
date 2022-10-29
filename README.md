# smd-timepicker

> React time picker with custom configurations
> --> Provides all the necessary styling and user friendly interaction, 
> --> Can able to modify the existing styling as well as can able to add custome css also.
> --> 24 hours format as well as 12 hours format 
> --> Easy to understand, given below gif

allowed formats are

h:m:s
h:m:ss
h:mm:s
h:mm:ss
hh:mm:ss
hh:mm:s
hh:m:ss
hh:m:s
 
or H


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


| Prop           | Default Value & Type 				 | Description                    |
| :------------: |:---------------:| :-----:|
|    onChange    | onChange: (e: any) => void    | Captures the output in the     |
|						     |												       | format of hh:mm a				      |
|						     |												       |											          |
| format   	   	|  hh:mm a  (string)     				 |   can able to pass the format  |
|						    |												         | like hh:mm a or HH:mm 	        |
|						    |												         |											          |
|  						  |						   						       |    if want pass default		    |
| value 			  | "" (string)  						     	|as hh:mm a format or		          |
|						    |												        |HH:mm format 					          |
|						    |										        		|											            |
| is24Hours  	 | false (Boolean)       			  	 |   if we want 24 hrs format     |
|						   |												          | then set this to true				  |
|						   |												          |											          |
| isIncludesSeconds|  false {Boolean)  		        | if you want seconds  also    	|
|						       |												      |											          |
| hoursPlaceholder |  `HH` {string)               | for hours input               |
|						       |											      	|											          |
|minutesPlaceholder|  `MM` {string)               | for minutes input             |
|						       |											      	|											          |
|secondsPlaceholder|  `SS` {string)               | for seconds input             |
|						       |												      |											          |
|   inputStyles    |  {...} (styles object)        | use inline styles for input  |
|						       |												       |											        |
|   inputClass     |  "" (className)               | can able to provide css      |
|						       |												      |											          |
|   selectStyle    |  {...} (styles object)       | use inline styles for select  |
|						       |												      |											          |
|   selectClass    |  "" (className)              | can able to provide css       |
|						       |												      |											          |
|  selectOptions   |[{name:'',value:''},..]			  | AM PM select options can be 	|
| 					    	 |												      | set using this prop 			    |
|					        	|												      |											          |

### keywords
    time-picker smd-timepicker custome-timepicker 

## License

 © [sivasankula19](https://github.com/sivasankula19)


