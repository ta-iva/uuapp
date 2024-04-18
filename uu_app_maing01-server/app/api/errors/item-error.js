"use strict";

const AppMainUseCaseError = require("./app-main-use-case-error.js");
const ITEM_ERROR_PREFIX = `${AppMainUseCaseError.ERROR_PREFIX}item/`;

const Create = {
  UC_CODE: `${ITEM_ERROR_PREFIX}create/`,
  
};

const Get = {
  UC_CODE: `${ITEM_ERROR_PREFIX}get/`,
  
};

const List = {
  UC_CODE: `${ITEM_ERROR_PREFIX}list/`,
  
};

const Update = {
  UC_CODE: `${ITEM_ERROR_PREFIX}update/`,
  
};

const Delete = {
  UC_CODE: `${ITEM_ERROR_PREFIX}delete/`,
  
};

module.exports = {
  Delete,
  Update,
  List,
  Get,
  Create
};
