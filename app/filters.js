const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter
const { DateTime } = require("luxon")

function govukDate(date) {
  return DateTime.fromISO(date).toFormat('d MMMM yyyy')
}
addFilter('date', govukDate)

function govukTime(date) {
  let dt = DateTime.fromISO(date)
  if (dt.minute > 0) {
    dt = dt.toFormat('h:mma')
  } else {
    dt = dt.toFormat('ha')
  }
  return dt.toLowerCase()
}
addFilter('time', govukTime)

function govukDateTime(date) {
  return govukDate(date) + ' at ' + govukTime(date)
}
addFilter('dateTime', govukDateTime)