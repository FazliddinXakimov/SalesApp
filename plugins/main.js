import Vue from 'vue'
import { numberFilter, formatDateTime } from '~/utils/formatters'

Vue.filter('numberFilter', numberFilter)
Vue.filter('formatDateTime', formatDateTime)
