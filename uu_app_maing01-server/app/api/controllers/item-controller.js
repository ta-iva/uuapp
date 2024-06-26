"use strict";
const ItemAbl = require("../../abl/item-abl.js");

class ItemController {

  delete(ucEnv) {
    return ItemAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn()), ucEnv.getSession();
  }

  update(ucEnv) {
    return ItemAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn()), ucEnv.getSession();
  }

  list(ucEnv) {
    return ItemAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return ItemAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ItemAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn()), ucEnv.getSession();
  }

}

module.exports = new ItemController();
