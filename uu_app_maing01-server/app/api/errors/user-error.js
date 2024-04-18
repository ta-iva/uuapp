"use strict";

const AppMainUseCaseError = require("./app-main-use-case-error.js");
const USER_ERROR_PREFIX = `${AppMainUseCaseError.ERROR_PREFIX}user/`;

const Get = {
  UC_CODE: `${USER_ERROR_PREFIX}get/`,
  
};

module.exports = {
  Get
};
