const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter
const { DateTime } = require("luxon")

addFilter('date', function(date) {
  return DateTime.fromISO(date).toFormat('d MMMM yyyy')
})