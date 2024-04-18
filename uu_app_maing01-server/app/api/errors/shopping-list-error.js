"use strict";

const AppMainUseCaseError = require("./app-main-use-case-error.js");
const SHOPPING_LIST_ERROR_PREFIX = `${AppMainUseCaseError.ERROR_PREFIX}shoppingList/`;

const Create = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}create/`,
  
};

const Get = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}get/`,
  
};

const List = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}list/`,
  
};

const Update = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}update/`,
  
};

const Delete = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}delete/`,
  
};

const AddMember = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}addMember/`,
  
};

const DeleteMember = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}deleteMember/`,
  
};

module.exports = {
  DeleteMember,
  AddMember,
  Delete,
  Update,
  List,
  Get,
  Create
};
