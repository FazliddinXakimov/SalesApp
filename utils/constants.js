import Vue from 'vue'

export const variables = {
  linkNames: {
    catalog: 'category',
    product: 'product',
  },
  responseStatus: {
    SMS_CODE_ERROR: 100,
    SMS_CODE_EXPIRED: 101,
    SMS_CODE_NOT_SENT: 102,
    SMS_CODE_REQUIRED: 103,
    PHONE_REQUIRED: 104,
    USER_BLOCKED: 110,
    TOO_MANY_ATTEMPTS_CODE: 105,
    SMS_CODE_ALREADY_SENT: 106,
    PHONE_NUMBER_ALREADY_TAKEN: 107,

    PHONE_NUMBER_DELETED: 109,
    USER_NOT_EXIST: 300,
    LOGIN_OR_PASSWORD_ERROR: 301,
  },
}

Vue.prototype.$const = variables
