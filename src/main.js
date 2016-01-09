import Vue from 'vue'
import app from './app.vue'

import './styles.css'

Vue.config.debug = process.env.NODE_ENV !== 'production'
console.log(new Date('02/02/2002'))

// Filter used on the dates of the timeline : 02/02/2005 => Feb '05
Vue.filter('month-year', function (value) {
  var dday = new Date(value)
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return monthNames[dday.getMonth()] + ' \'' + String(dday.getFullYear()).substring(2, 4)
})
// Filter used on the mobile version of the timeline
Vue.filter('full-month-year', function (value) {
  var dday = new Date(value)
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return monthNames[dday.getMonth()] + ' ' + dday.getFullYear()
})

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    app
  }
})
