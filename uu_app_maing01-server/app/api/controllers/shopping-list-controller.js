"use strict";
const ShoppingListAbl = require("../../abl/shopping-list-abl.js");

class ShoppingListController {

  deleteMember(ucEnv) {
    return ShoppingListAbl.deleteMember(ucEnv.getUri().getAwid(), ucEnv.getDtoIn()), ucEnv.getSession();
  }

  addMember(ucEnv) {
    return ShoppingListAbl.addMember(ucEnv.getUri().getAwid(), ucEnv.getDtoIn()), ucEnv.getSession();
  }

  delete(ucEnv) {
    return ShoppingListAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn()), ucEnv.getSession();
  }

  update(ucEnv) {
    return ShoppingListAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn()), ucEnv.getSession();
  }

  list(ucEnv) {
    return ShoppingListAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return ShoppingListAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ShoppingListAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn()), ucEnv.getSession();
  }

}

module.exports = new ShoppingListController();
