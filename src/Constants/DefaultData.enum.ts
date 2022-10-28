export const defaultOptions = [
  { name: '--', value: '' },
  { name: 'AM', value: 'am' },
  { name: 'PM', value: 'pm' }
]

export const allowedFormats = [
  { format: 'h:m:s', inTime: '12hrs', seconds: 's', minutes: 'm', hours: 'h' },
  {
    format: 'h:m:ss',
    inTime: '12hrs',
    seconds: 'ss',
    minutes: 'm',
    hours: 'h'
  },
  {
    format: 'h:mm:s',
    inTime: '12hrs',
    seconds: 's',
    minutes: 'mm',
    hours: 'h'
  },
  {
    format: 'h:mm:ss',
    inTime: '12hrs',
    seconds: 'ss',
    minutes: 'mm',
    hours: 'h'
  },
  {
    format: 'hh:m:s',
    inTime: '12hrs',
    seconds: 's',
    minutes: 'm',
    hours: 'hh'
  },
  {
    format: 'hh:m:ss',
    inTime: '12hrs',
    seconds: 'ss',
    minutes: 'm',
    hours: 'hh'
  },
  {
    format: 'hh:mm:s',
    inTime: '12hrs',
    seconds: 's',
    minutes: 'mm',
    hours: 'hh'
  },
  {
    format: 'hh:mm:ss',
    inTime: '12hrs',
    seconds: 'ss',
    minutes: 'mm',
    hours: 'hh'
  }
]

export const allowed24Formats = [
  { format: 'H:m:s', inTime: '24hrs', seconds: 's', minutes: 'm', hours: 'H' },
  {
    format: 'H:m:ss',
    inTime: '24hrs',
    seconds: 'ss',
    minutes: 'm',
    hours: 'H'
  },
  {
    format: 'H:mm:s',
    inTime: '24hrs',
    seconds: 's',
    minutes: 'mm',
    hours: 'H'
  },
  {
    format: 'H:mm:ss',
    inTime: '24hrs',
    seconds: 'ss',
    minutes: 'mm',
    hours: 'H'
  },
  {
    format: 'HH:m:s',
    inTime: '24hrs',
    seconds: 's',
    minutes: 'm',
    hours: 'HH'
  },
  {
    format: 'HH:m:ss',
    inTime: '24hrs',
    seconds: 'ss',
    minutes: 'm',
    hours: 'HH'
  },
  {
    format: 'HH:mm:s',
    inTime: '24hrs',
    seconds: 's',
    minutes: 'mm',
    hours: 'HH'
  },
  {
    format: 'HH:mm:ss',
    inTime: '24hrs',
    seconds: 'ss',
    minutes: 'mm',
    hours: 'HH'
  }
]

export const defaultFormat = allowedFormats[7]
export const default24Format = allowed24Formats[7]

export const hoursOptions24 = [
  { name: '00', value: '00' },
  { name: '01', value: '01' },
  { name: '02', value: '02' },
  { name: '03', value: '03' },
  { name: '04', value: '04' },
  { name: '05', value: '05' },
  { name: '06', value: '06' },
  { name: '07', value: '07' },
  { name: '08', value: '08' },
  { name: '09', value: '09' },
  { name: '10', value: '10' },
  { name: '11', value: '11' },
  { name: '12', value: '12' },
  { name: '13', value: '13' },
  { name: '14', value: '14' },
  { name: '15', value: '15' },
  { name: '16', value: '16' },
  { name: '17', value: '17' },
  { name: '18', value: '18' },
  { name: '19', value: '19' },
  { name: '20', value: '20' },
  { name: '21', value: '21' },
  { name: '22', value: '22' },
  { name: '23', value: '23' }
]

export const hoursOptions12 = [
  { name: '01', value: '01' },
  { name: '02', value: '02' },
  { name: '03', value: '03' },
  { name: '04', value: '04' },
  { name: '05', value: '05' },
  { name: '06', value: '06' },
  { name: '07', value: '07' },
  { name: '08', value: '08' },
  { name: '09', value: '09' },
  { name: '10', value: '10' },
  { name: '11', value: '11' },
  { name: '12', value: '12' }
]

export const minsOrSeconds = [
  { name: '00', value: '00' },
  { name: '01', value: '01' },
  { name: '02', value: '02' },
  { name: '03', value: '03' },
  { name: '04', value: '04' },
  { name: '05', value: '05' },
  { name: '06', value: '06' },
  { name: '07', value: '07' },
  { name: '08', value: '08' },
  { name: '09', value: '09' },
  { name: '10', value: '10' },
  { name: '11', value: '11' },
  { name: '12', value: '12' },
  { name: '13', value: '13' },
  { name: '14', value: '14' },
  { name: '15', value: '15' },
  { name: '16', value: '16' },
  { name: '17', value: '17' },
  { name: '18', value: '18' },
  { name: '19', value: '19' },
  { name: '20', value: '20' },
  { name: '21', value: '21' },
  { name: '22', value: '22' },
  { name: '23', value: '23' },
  { name: '24', value: '24' },
  { name: '25', value: '25' },
  { name: '26', value: '26' },
  { name: '27', value: '27' },
  { name: '28', value: '28' },
  { name: '29', value: '29' },
  { name: '30', value: '30' },
  { name: '31', value: '31' },
  { name: '32', value: '32' },
  { name: '33', value: '33' },
  { name: '34', value: '34' },
  { name: '35', value: '35' },
  { name: '36', value: '36' },
  { name: '37', value: '37' },
  { name: '38', value: '38' },
  { name: '39', value: '39' },
  { name: '40', value: '40' },
  { name: '41', value: '41' },
  { name: '42', value: '42' },
  { name: '43', value: '43' },
  { name: '44', value: '44' },
  { name: '45', value: '45' },
  { name: '46', value: '46' },
  { name: '47', value: '47' },
  { name: '48', value: '48' },
  { name: '49', value: '49' },
  { name: '50', value: '50' },
  { name: '51', value: '51' },
  { name: '52', value: '52' },
  { name: '53', value: '53' },
  { name: '54', value: '54' },
  { name: '55', value: '55' },
  { name: '56', value: '56' },
  { name: '57', value: '57' },
  { name: '58', value: '58' },
  { name: '59', value: '59' }
]
