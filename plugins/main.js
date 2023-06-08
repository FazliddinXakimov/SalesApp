import Vue from 'vue'
import { numberFilter } from '~/utils/formatters'

Vue.filter('numberFilter', numberFilter)
