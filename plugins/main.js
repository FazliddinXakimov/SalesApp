import Vue from 'vue'
import { numberFilter, formatDateTime, returnNumber } from '~/utils/formatters'

Vue.filter('numberFilter', numberFilter)
Vue.filter('formatDateTime', formatDateTime)
Vue.filter('returnNumber', returnNumber)
